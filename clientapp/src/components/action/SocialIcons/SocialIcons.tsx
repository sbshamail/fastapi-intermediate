import React from 'react';
import Link from 'next/link';
import Iconify from '@/@core/common/icon';

const SocialIcons = () => {
  return (
    <div className="flex space-x-3">
      <Link href="#">
        <Iconify
          icon="ic:baseline-facebook"
          className="hover:text-primary Transition"
        />
      </Link>
      <Link href="#">
        <Iconify
          icon="mdi:instagram"
          className="hover:text-primary Transition"
        />
      </Link>
      <Link href="#">
        <Iconify
          icon="mdi:pinterest"
          className="hover:text-primary Transition"
        />
      </Link>
      <Link href="#">
        <Iconify
          icon="ic:baseline-tiktok"
          className="hover:text-primary Transition"
        />
      </Link>
    </div>
  );
};

export default SocialIcons;
