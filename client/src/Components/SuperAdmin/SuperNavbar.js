import React, { useEffect, useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { GiPartyPopper } from 'react-icons/gi';
import { FaUserAlt } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { GiPartyHat } from 'react-icons/gi';
import { FaHotel } from 'react-icons/fa';
import { toast } from 'react-toastify';

function SuperNavbar() {
  const menus = [
    { name: 'Dashboard', link: '/superadmindashboard', icon: MdOutlineDashboard },
    { name: 'Clients', link: '/', icon: FaUserAlt },
    { name: 'Plans', link: '/', icon: FaHotel },
  ];
  const [open, setOpen] = useState(true);

  return (
    <>
      <section className="flex gap-6">
        <div className={`bg-[#0e0e0e] min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 text-gray-100 px-4`}>
          <div className="py-3 flex justify-end">
            <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus.map((menu, i) => (
              <Link
                to={menu.link}
                key={i}
                className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              >
                <menu.icon size={20} />
                <h2>{menu.name}</h2>
              </Link>
            ))}

            <Link to="/" className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md">
              <IoIosLogOut size={20} />
              <h2>Logout</h2>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default SuperNavbar;
