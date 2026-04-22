import React from 'react';

export default function TermsOfService() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 font-sans text-zinc-800">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black mb-8 border-b-4 border-black inline-block">
                Terms of Service
            </h1>
            
            <p className="text-sm text-zinc-500 mb-12 italic">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <section className="space-y-10">
                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-black mb-4">1. Acceptance of Terms</h2>
                    <p className="text-sm leading-relaxed">
                        By accessing and using black & white vapors, you agree to be bound by these terms of service and all applicable laws and regulations.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-black mb-4 underline decoration-[#25D366] decoration-4 underline-offset-8">2. Replacement & Return Policy / واپسی اور تبدیلی کی پالیسی</h2>
                    <div className="bg-zinc-50 p-6 rounded-sm border-l-4 border-black mt-6 space-y-4">
                        <p className="text-sm leading-relaxed font-bold">
                            If the product has arrived damaged, it can be replaced. 
                        </p>
                        <p className="text-right font-bold text-sm" dir="rtl">
                            اگر پروڈکٹ خراب حالت میں پہنچی ہے تو اسے تبدیل کیا جا سکتا ہے۔
                        </p>
                        
                        <div className="h-[1px] bg-zinc-200 my-4" />

                        <p className="text-sm leading-relaxed">
                            <strong className="text-black uppercase">Mandatory Requirement:</strong> To qualify for a replacement for a damaged item, we require an **unboxing video** showing the product as it is being opened for the first time.
                        </p>
                        <p className="text-right text-sm" dir="rtl">
                            <strong>لازمی شرط:</strong> کسی بھی خراب پروڈکٹ کی تبدیلی کے لیے ہمیں **پہلی بار پروڈکٹ کھولنے (Unboxing) کی ویڈیو** درکار ہے۔
                        </p>

                        <div className="bg-white p-4 border border-zinc-200 text-[13px] leading-relaxed text-zinc-600">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <strong>Note on Returns:</strong> Once a product is opened and used, returns or replacements will <strong>NOT</strong> be considered for:
                                    <ul className="list-disc ml-5 mt-2 space-y-1">
                                        <li>Dislike of color.</li>
                                        <li>Product not meeting subjective "joy" or expectations.</li>
                                    </ul>
                                </div>
                                <div className="flex-1 text-right" dir="rtl">
                                    <strong>اہم نوٹ:</strong> پروڈکٹ استعمال کرنے کے بعد درج ذیل وجوہات پر واپسی یا تبدیلی <strong>نہیں</strong> کی جائے گی:
                                    <ul className="list-disc mr-5 mt-2 space-y-1">
                                        <li>رنگ پسند نہ آنا۔</li>
                                        <li>پروڈکٹ کا توقعات یا "خوشی" کے مطابق نہ ہونا۔</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-black mb-4">3. Product Disclaimer</h2>
                    <p className="text-sm leading-relaxed">
                        Vaping products are sold "as is" regarding personal preference. We guarantee the functionality and authenticity of our products upon arrival, but we cannot guarantee personal satisfaction with specific flavors or device experiences.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-black mb-4">4. Contact for Support</h2>
                    <p className="text-sm leading-relaxed">
                        To report a damaged item (with video proof), please contact us immediately:
                    </p>
                    <ul className="mt-4 space-y-2 text-sm font-bold text-black uppercase tracking-wider">
                        <li>Email: blackandwhitevapors@gmail.com</li>
                        <li>WhatsApp Hassan: 03444333374</li>
                        <li>WhatsApp Bilal: 03049477198</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
