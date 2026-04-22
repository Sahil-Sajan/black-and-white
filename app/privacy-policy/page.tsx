import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 font-sans text-zinc-800">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black mb-8 border-b-4 border-black inline-block">
                Privacy Policy
            </h1>
            
            <p className="text-sm text-zinc-500 mb-12 italic">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <section className="space-y-10">
                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-black mb-4">1. Introduction</h2>
                    <p className="text-sm leading-relaxed">
                        Welcome to Black & White Vapors. We are committed to protecting your personal information and your right to privacy. 
                        If you have any questions or concerns about our policy, or our practices with regards to your personal information, 
                        please contact us at blackandwhitevapors@gmail.com.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-black mb-4">2. Information We Collect</h2>
                    <p className="text-sm leading-relaxed mb-3">
                        We collect personal information that you provide to us such as name, address, contact information, passwords and security data, 
                        and payment information. We collect personal information that you voluntarily provide to us when expressing an interest 
                        in obtaining information about us or our products, when participating in activities on our website or otherwise contacting us.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-black mb-4">3. How We Use Your Information</h2>
                    <p className="text-sm leading-relaxed">
                        We use personal information collected via our website for a variety of business purposes described below. 
                        We process your personal information for these purposes in reliance on our legitimate business interests, 
                        in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-black mb-4">4. Sharing Your Information</h2>
                    <p className="text-sm leading-relaxed">
                        We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, 
                        or to fulfill business obligations.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-black mb-4">5. Contact Us</h2>
                    <p className="text-sm leading-relaxed">
                        If you have questions or comments about this policy, you may email us at <strong>blackandwhitevapors@gmail.com</strong> 
                        or call us at <strong>03444333374 (Hassan)</strong> or <strong>03049477198 (Bilal)</strong>.
                    </p>
                </div>
            </section>
        </div>
    );
}
