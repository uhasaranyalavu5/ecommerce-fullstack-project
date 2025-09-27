// frontend/src/components/Footer.jsx

import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Ecommerce Dashboard. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;