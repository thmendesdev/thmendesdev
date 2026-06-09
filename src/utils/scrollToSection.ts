export function getHeaderOffset(): number {
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue('--header-offset').trim();

  if (raw.endsWith('rem')) {
    const rem = parseFloat(raw);
    const fontSize = parseFloat(getComputedStyle(root).fontSize);
    return rem * fontSize;
  }

  if (raw.endsWith('px')) {
    return parseFloat(raw);
  }

  return 88;
}

export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = 'smooth'
): void {
  const element = document.getElementById(id);
  if (!element) return;

  const offset = getHeaderOffset();
  const targetTop = element.getBoundingClientRect().top + window.scrollY - offset;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  window.scrollTo({
    top: Math.max(0, Math.min(targetTop, maxScroll)),
    behavior,
  });
}

export function handleSectionLinkClick(
  event: { preventDefault: () => void },
  href: string
): void {
  if (!href.startsWith('#') || href.length < 2) return;

  event.preventDefault();
  scrollToSection(href.slice(1));
}
