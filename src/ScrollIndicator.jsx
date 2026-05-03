export default function ScrollIndicator() {
  return (
    <div className="scroll-indicator" aria-hidden="true">
      <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          id="circlePath"
          d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          fill="transparent"
        />
        <text fontFamily="Arial, sans-serif" fontSize="6" letterSpacing="2.5" fill="currentColor">
          <textPath href="#circlePath">
            KEEP SCROLLING • KEEP SCROLLING • KEEP SCROLLING •{" "}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
