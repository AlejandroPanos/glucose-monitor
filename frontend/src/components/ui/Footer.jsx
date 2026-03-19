const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-3">GlucoTrack</h3>
            <p className="text-sm text-gray-600 mb-4">
              Smart diabetes management at your fingertips.
            </p>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#hero"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Hero
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#faqs"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© 2025 GlucoTrack. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-blue-600 transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-blue-600 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
