"use client";

import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Button from "../button";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

// Wrapper component for Spline with error handling
const SplineWrapper = ({ scene, onError }: { scene: string; onError: () => void }) => {
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure container has proper dimensions before initializing WebGL
    const checkContainerReady = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setIsReady(true);
        } else {
          // Retry after a short delay
          setTimeout(checkContainerReady, 50);
        }
      }
    };

    checkContainerReady();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Listen for WebGL context lost events
    const handleContextLost = (event: Event) => {
      console.warn('WebGL context lost:', event);
      event.preventDefault();
      setHasError(true);
      onError();
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      setHasError(false);
    };

    // Enhanced WebGL error handler for specific dimension issues
    const handleWebGLError = (event: ErrorEvent) => {
      if (event.message && (
        event.message.includes('WebGL') || 
        event.message.includes('FRAMEBUFFER') ||
        event.message.includes('GL_INVALID') ||
        event.message.includes('glTexStorage2D') ||
        event.message.includes('zero size') ||
        event.message.includes('Attachment has zero size')
      )) {
        console.warn('WebGL error detected:', event.message);
        setHasError(true);
        onError();
      }
    };

    // Monitor for resize events that might cause dimension issues
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          console.warn('Container dimensions became zero, preventing WebGL errors');
          setHasError(true);
          onError();
        }
      }
    };

    window.addEventListener('webglcontextlost', handleContextLost);
    window.addEventListener('webglcontextrestored', handleContextRestored);
    window.addEventListener('error', handleWebGLError);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
      window.removeEventListener('error', handleWebGLError);
      window.removeEventListener('resize', handleResize);
    };
  }, [onError, isReady]);

  if (hasError) {
    return (
      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl"
      >
        <Image 
          src="/images/heroImage.webp" 
          className="w-full h-auto rounded-xl max-w-[700px]" 
          alt="Vanna Finance hero illustration"
          width={900}
          height={600}
          priority
        />
      </div>
    );
  }

  if (!isReady) {
    return (
      <div 
        ref={containerRef}
        className="w-full h-full bg-gray-100 rounded-xl animate-pulse flex items-center justify-center"
        style={{ minWidth: '100px', minHeight: '100px' }}
      >
        <div className="text-gray-500">Preparing 3D Scene...</div>
      </div>
    );
  }

  try {
    return (
      <div 
        ref={containerRef}
        className="w-full h-full rounded-xl"
        style={{ minWidth: '100px', minHeight: '100px' }}
      >
        <Spline
          scene={scene}
          className="w-full h-full rounded-xl"
          style={{ minWidth: '100px', minHeight: '100px' }}
          onLoad={() => {
            console.log('Spline scene loaded successfully');
            // Verify canvas dimensions after load
            if (containerRef.current) {
              const canvas = containerRef.current.querySelector('canvas');
              if (canvas && (canvas.width === 0 || canvas.height === 0)) {
                console.warn('Canvas has zero dimensions after load, falling back');
                setHasError(true);
                onError();
              }
            }
          }}
          onError={(error) => {
            console.error('Spline loading error:', error);
            setHasError(true);
            onError();
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('Spline component error:', error);
    setHasError(true);
    onError();
    return (
      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl"
      >
        <Image 
          src="/images/heroImage.webp" 
          className="w-full h-auto rounded-xl max-w-[700px]" 
          alt="Vanna Finance hero illustration"
          width={900}
          height={600}
          priority
        />
      </div>
    );
  }
};

const HeroSection = () => {
  const [webglSupported, setWebglSupported] = useState(true);
  const [splineError, setSplineError] = useState(false);

  useEffect(() => {
    // Check WebGL support
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        // Set canvas size to prevent memory issues
        canvas.width = 1;
        canvas.height = 1;
        
        const gl = canvas.getContext('webgl', {
          antialias: false,
          alpha: false,
          depth: false,
          stencil: false,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: true
        }) as WebGLRenderingContext | null || canvas.getContext('experimental-webgl', {
          antialias: false,
          alpha: false,
          depth: false,
          stencil: false,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: true
        }) as WebGLRenderingContext | null;
        
        if (!gl) {
          console.warn('WebGL not supported');
          setWebglSupported(false);
          canvas.remove();
          return false;
        }
        
        // Check WebGL capabilities
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        const maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
        
        if (maxTextureSize < 1024 || maxRenderbufferSize < 1024) {
          console.warn('WebGL capabilities insufficient for 3D rendering');
          setWebglSupported(false);
          canvas.remove();
          return false;
        }
        
        // Test framebuffer creation to prevent the errors we're seeing
        const framebuffer = gl.createFramebuffer();
        if (!framebuffer) {
          console.warn('Cannot create WebGL framebuffer');
          setWebglSupported(false);
          canvas.remove();
          return false;
        }
        
        // Clean up test resources
        gl.deleteFramebuffer(framebuffer);
        canvas.remove();
        return true;
      } catch (error) {
        console.warn('WebGL support check failed:', error);
        setWebglSupported(false);
        return false;
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      checkWebGLSupport();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSplineError = () => {
    console.warn('Spline component failed to load, falling back to static image');
    setSplineError(true);
  };

  useEffect(() => {
    // Suppress specific WebGL errors that are harmless but noisy
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const message = args.join(' ');
      // Filter out specific WebGL errors that don't affect functionality
      if (
        message.includes('GL_INVALID_FRAMEBUFFER_OPERATION') ||
        message.includes('FRAMEBUFFER_INCOMPLETE_ATTACHMENT') ||
        message.includes('Framebuffer is incomplete') ||
        message.includes('glClear: Framebuffer is incomplete') ||
        message.includes('glDrawArrays: Framebuffer is incomplete') ||
        message.includes('glDrawElements: Framebuffer is incomplete') ||
        message.includes('glClearBufferfv: Framebuffer is incomplete') ||
        message.includes('GL_INVALID_VALUE: glTexStorage2D') ||
        message.includes('Texture dimensions must all be greater than zero') ||
        message.includes('Attachment has zero size')
      ) {
        // These are often false positives from Spline's internal rendering during initialization
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      if (
        message.includes('WebGL: too many errors, no more errors will be reported') ||
        message.includes('WEBGL_debug_renderer_info')
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return (
    <section className="w-full flex flex-col items-center px-4 md:px-8 pt-16 md:pt-28">
      <div className="custom-container w-full flex flex-col justify-center items-center gap-8 text-center">
        <div className="max-w-[950px] flex-col justify-center items-center gap-6 flex">
          <h1 className="text-3xl md:text-5xl font-bold md:leading-[60px] lg:leading-[70px] transition-all">
            Unlock <span className="text-primary">Major Liquidity </span>
            with LSTs and LRTs,{" "}
            <span className="text-primary">Trade Across Markets</span>, and{" "}
            <span className="text-primary">Hedge Smart</span> with Advanced
            Strategies
          </h1>
          <p className="text-base lg:text-xl font-medium text-[#76737B] max-w-[800px] mx-auto">
            Vanna provides superior APYs for lenders and empowers traders with
            cross-market strategies using composable leverage and chain
            abstraction.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
            <Button
              className="rounded-[8px] flex gap-2.5 bg-[#F2ECFE] p-3 px-4"
              redirectTo="https://discord.gg/MmK9rsWdzS"
            >
              <Image src="/icons/discordLogo.svg" alt="Discord logo" width={20} height={20} />
              <p className="text-base font-[600] text-primary">Join Discord</p>
            </Button>
            <Button
              className="gradient-button text-base font-semibold"
              redirectTo="/join_waitlist"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Image 
            src="/images/heroImage.webp" 
            className="block lg:hidden w-full h-auto rounded-xl max-w-[700px]" 
            alt="Vanna Finance hero illustration"
            width={900}
            height={600}
            priority
          />
          <div 
            className="hidden lg:block w-full max-w-[900px] h-screen"
            style={{ 
              minWidth: '300px', 
              minHeight: '300px',
              position: 'relative'
            }}
          >
            {webglSupported && !splineError ? (
              <Suspense 
                fallback={
                  <div 
                    className="w-full h-screen bg-gray-100 rounded-xl animate-pulse flex items-center justify-center"
                    style={{ minWidth: '300px', minHeight: '300px' }}
                  >
                    <div className="text-gray-500">Loading 3D Scene...</div>
                  </div>
                }
              >
                <SplineWrapper 
                  scene="https://prod.spline.design/IBk2UFq-Ep8YlEIb/scene.splinecode"
                  onError={handleSplineError}
                />
              </Suspense>
            ) : (
              <div 
                className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl"
                style={{ minWidth: '300px', minHeight: '300px' }}
              >
                <Image 
                  src="/images/heroImage.webp" 
                  className="w-full h-auto rounded-xl max-w-[700px]" 
                  alt="Vanna Finance hero illustration"
                  width={900}
                  height={600}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
