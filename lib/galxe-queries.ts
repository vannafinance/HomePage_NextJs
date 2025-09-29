const accessToken = process.env.NEXT_GALAXE_ACCESSTOKEN as string | undefined;

// Define the expected GraphQL response structure
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface GalxeQuest {
  id: string;
  name: string;
  status: string;
  credentialGroups: CredentialGroup[];
}

interface CredentialGroup {
  id: string;
  name: string;
  conditionRelation: 'ALL' | 'ANY';
  conditions: Condition[];
  rewards: Reward[];
}

interface Condition {
  expression: string;
  eligible: boolean;
}

interface Reward {
  expression: string;
  eligible: boolean;
  rewardType: string;
  rewardCount: number;
}

interface EligibilityResult {
  groupId: string;
  groupName: string;
  conditionsMet: boolean;
  eligibleRewards: Reward[];
}

interface EligibilityResponse {
  questId: number;
  userAddress: string;
  isCompleted: boolean;
  isEligible: boolean;
  isQuestActive: boolean;
  eligibilityDetails: EligibilityResult[];
  questName: string;
  questStatus: string;
}

async function checkUserEligibility(
  questId: number,
  userAddress: string,
  accessToken: string
): Promise<EligibilityResponse> {
  // Normalize EVM address (lowercase, validate format)
  const normalizedAddress = userAddress.toLowerCase().startsWith('0x') ? userAddress.toLowerCase() : null;
  if (!normalizedAddress || !/^0x[a-fA-F0-9]{40}$/.test(normalizedAddress)) {
    throw new Error('Invalid EVM address format');
  }

  if (!accessToken) {
    throw new Error('Access token is not provided');
  }

  const response = await fetch('https://graphigo-business.prd.galaxy.eco/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-token': accessToken, // Your Galxe access token (from developer portal)
    },
    body: JSON.stringify({
      query: `query CheckUserEligibility($questId: ID!, $address: String!) {
        quest(id: $questId) {
          id
          name
          status
          credentialGroups(address: $address) {
            id
            name
            conditionRelation
            conditions {
              expression
              eligible
            }
            rewards {
              expression
              eligible
              rewardType
              rewardCount
            }
          }
        }
      }`,
      variables: { questId: String(questId), address: normalizedAddress },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  // Handle GraphQL errors
  if (data.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
  }

  const quest = data.data?.quest;
  if (!quest) {
    throw new Error('Quest not found or no data returned');
  }

  // Check if quest is active
  const isQuestActive = quest.status === 'ACTIVE';

  const eligibilityResults = quest.credentialGroups.map((group: CredentialGroup) => {
    // Check conditions based on relation (ALL or ANY)
    const conditionsMet = group.conditionRelation === 'ALL'
      ? group.conditions.every((c: Condition) => c.eligible)
      : group.conditions.some((c: Condition) => c.eligible);

    const eligibleRewards = group.rewards.filter((r: Reward) => r.eligible);

    return {
      groupId: group.id,
      groupName: group.name,
      conditionsMet,
      eligibleRewards,
    };
  });

  const hasCompletedGroups = eligibilityResults.some((r: EligibilityResult) => r.conditionsMet);
  const hasEligibleRewards = eligibilityResults.some((r: EligibilityResult) => r.eligibleRewards.length > 0);
  const isEligible = hasCompletedGroups && hasEligibleRewards;
  const isCompleted = isEligible && isQuestActive; // True if completed AND quest is active

  return {
    questId,
    userAddress: normalizedAddress,
    isCompleted,
    isEligible,
    isQuestActive,
    eligibilityDetails: eligibilityResults,
    questName: quest.name,
    questStatus: quest.status,
  };
}

// Example usage (optional, for testing)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (async () => {
    try {
      const result = await checkUserEligibility(
        12345, // Replace with actual quest ID
        '0x742d35Cc6bBBFe8f2f2C27bD424cC7f2e4b0b0a4',
        accessToken || ''
      );
      console.log('Eligibility Result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
}

export { checkUserEligibility };