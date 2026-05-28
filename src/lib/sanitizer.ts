"use client";

/**
 * A simple native HTML sanitizer that removes potentially dangerous tags and attributes.
 * This is a lightweight alternative to dompurify for basic use cases.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  
  // List of allowed tags
  const allowedTags = ["B", "I", "EM", "STRONG", "P", "BR", "UL", "OL", "LI", "SPAN"];
  
  const allElements = doc.body.querySelectorAll("*");
  
  allElements.forEach((el) => {
    // Remove tags not in the allowed list
    if (!allowedTags.includes(el.tagName)) {
      // Move children to the parent before removing the tag to preserve content
      while (el.firstChild) {
        el.parentNode?.insertBefore(el.firstChild, el);
      }
      el.remove();
      return;
    }

    // Remove all attributes that start with 'on' (event handlers) or 'href' containing javascript:
    Array.from(el.attributes).forEach((attr) => {
      const attrName = attr.name.toLowerCase();
      const attrValue = attr.value.toLowerCase();

      if (attrName.startsWith("on") || (attrName === "href" && attrValue.includes("javascript:"))) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return doc.body.innerHTML;
}