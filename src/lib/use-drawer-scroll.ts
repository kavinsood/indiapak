import { useEffect } from 'react';

interface UseDrawerScrollProps {
  open: boolean;
}

export function useDrawerScroll({ open }: UseDrawerScrollProps) {
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    let originalBodyOverflow = '';
    let originalBodyPaddingRight = '';
    let originalBodyMarginRight = '';
    let originalHtmlOverflow = '';

    if (open) {
      originalBodyOverflow = body.style.overflow;
      originalBodyPaddingRight = body.style.paddingRight;
      originalBodyMarginRight = body.style.marginRight;
      originalHtmlOverflow = html.style.overflow;

      body.style.setProperty('overflow', 'auto', 'important');
      body.style.setProperty('padding-right', '0px', 'important');
      body.style.setProperty('margin-right', '0px', 'important');
      html.style.setProperty('overflow', 'auto', 'important');
    } else {
      // Only restore if they were changed by this effect
      if (body.style.getPropertyValue('overflow') === 'auto' && body.style.getPropertyPriority('overflow') === 'important') {
        body.style.overflow = originalBodyOverflow;
      }
      if (body.style.getPropertyValue('padding-right') === '0px' && body.style.getPropertyPriority('padding-right') === 'important') {
        body.style.paddingRight = originalBodyPaddingRight;
      }
      if (body.style.getPropertyValue('margin-right') === '0px' && body.style.getPropertyPriority('margin-right') === 'important') {
        body.style.marginRight = originalBodyMarginRight;
      }
      if (html.style.getPropertyValue('overflow') === 'auto' && html.style.getPropertyPriority('overflow') === 'important') {
        html.style.overflow = originalHtmlOverflow;
      }
    }

    // Cleanup function to restore original styles when component unmounts or before re-running due to `open` changing
    return () => {
      body.style.overflow = originalBodyOverflow;
      body.style.paddingRight = originalBodyPaddingRight;
      body.style.marginRight = originalBodyMarginRight;
      html.style.overflow = originalHtmlOverflow;
    };
  }, [open]);
} 