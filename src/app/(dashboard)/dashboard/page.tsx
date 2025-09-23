import React from 'react';

const DashboardHome = () => {
    return (
        <div className='mb-[1000px]'>
           <div className='flex justify-between items-center py-2 rounded-3xl border border-teal-800 px-5'>
                <div className='flex gap-4'>
                    <div>
                        <h1 className='h-10 w-10 rounded-full  bg-slate-400'></h1>
                    </div>
                    <div className=''>
                        <p>Sam jisan</p>
                        <p>sam@gmail.com</p>
                    </div>
                </div>
                <div>
                    <button className='px-5 py-2 rounded-md bg-teal-400'>click</button>
                </div>
                <div>
                    <button className='px-5 py-2 rounded-md bg-teal-400 text-black text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px]'>log out</button>
                </div>
           </div>
        </div>
    );
};

export default DashboardHome;