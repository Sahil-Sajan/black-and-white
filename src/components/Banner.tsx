import React from 'react';

const DeliveryBanner: React.FC = () => {
    return (
        <div className="hidden md:block w-full">
            <div className="max-w-[1600px] mx-auto w-full h-[500px]  overflow-hidden">
                <img
                    src="/banner.png"
                    alt="Same-Day Delivery in Karachi for All Your Needs - Orders before 3:00 PM"
                    className="w-full h-full mt-20 object-cover"
                />
            </div>
        </div>
    );
};

export default DeliveryBanner;