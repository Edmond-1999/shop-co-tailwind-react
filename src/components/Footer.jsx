import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  const sections = [
    {
      title: 'COMPANY',
      links: ['About', 'Features', 'Works', 'Career'],
    },
    {
      title: 'HELP',
      links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
    },
    {
      title: 'FAQ',
      links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
    },
    {
      title: 'RESOURCES',
      links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'YouTube Playlist'],
    },
  ];
  const socialLinks = [
    { Icon: FaTwitter, label: 'Twitter' },
    { Icon: FaFacebookF, label: 'Facebook' },
    { Icon: FaInstagram, label: 'Instagram' },
    { Icon: FaGithub, label: 'GitHub' },
  ];
  const paymentMethods = ['VISA', 'MC', 'PAY', 'G Pay'];

  return (
    <footer className="mt-8 bg-zinc-100 pt-12 sm:mt-12 sm:pt-16">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <Link to="/" className="text-2xl font-black tracking-[-1px]">
            SHOP.CO
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-600">
            We have clothes that suits your style and which you're proud to wear. From women to men.
          </p>
          <div className="mt-5 flex gap-2">
            {socialLinks.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-zinc-300 bg-white text-sm hover:bg-black hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-bold tracking-[2px]">{section.title}</h4>
            <div className="mt-5 grid gap-3">
              {section.links.map((link) => (
                <Link key={link} to="/" className="text-sm text-zinc-600 hover:text-black">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-[1240px] flex-col gap-4 border-t border-zinc-300 px-4 py-6 text-xs text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <span>Shop.co © 2000-2026, All Rights Reserved</span>
        <div className="flex gap-2">
          {paymentMethods.map((method) => (
            <b key={method} className="rounded border border-zinc-200 bg-white px-3 py-1 text-[10px] text-zinc-700">
              {method}
            </b>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
