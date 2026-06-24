const footerColumns: Record<string, string[]> = {
  Company: ["FAQ", "Jobs", "Press", "About"],
  Account: ["My Account", "Profiles", "Membership"],
  Help: ["Help Center", "Contact Us", "Speed Test"],
  Legal: ["Privacy", "Terms of Use", "Cookies"],
};

export default function LandingFooter() {
  return (
    <footer className="bg-surface">
      <div className="max-w-6xl mx-auto px-4 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerColumns).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-text">{heading}</h3>
              {links.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-sm text-text-faint hover:text-text transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-text-faint">
          © 2025 Filmalisa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
