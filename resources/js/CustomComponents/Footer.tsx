import React from 'react'

type Props = {}

const Footer = () => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 w-full z pointer-events-none"
      aria-hidden="true"
    >
      <img
        src="/images/icons/footer.png"
        alt="footer"
        className="w-full h-auto pointer-events-none select-none"
        draggable={false}
      />
    </div>
  );
};

export default Footer;
