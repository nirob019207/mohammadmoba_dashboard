'use client';


import { usePathname } from 'next/navigation';
import { FaAngleRight } from 'react-icons/fa6';

import { useApplicationQuery } from '@/Redux/Api/applicationApi'; 
import ApplicationTable from '../Table/ApplicationTable'; 


const Application = () => {
  const { data, isLoading } = useApplicationQuery(undefined);
  
  const appData = data?.data?.applications?.data;


  const pathname = usePathname();

  return (
    <div className="p-10"> 
      <div className="flex justify-between mb-5">
        <div>
          <h1 className="text-white font-semibold flex items-center gap-2">
            Application <FaAngleRight />{' '}
          </h1>
        </div>
        <div>
          <ApplicationTable application={appData} isLoading={isLoading} serial={1} />
        </div>
        <div>
         
        </div>
      </div>
    </div>
  );
};

export default Application;
