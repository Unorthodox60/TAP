import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-5 flex justify-between items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm min-h-[44px]"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-primary text-lg pr-8">{question}</span>
        <ChevronDown 
          className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          aria-hidden="true"
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!isOpen}
      >
        <p className="text-on-surface/80">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      q: 'क्या यह सच में घर का बना (homemade) अचार है?',
      a: 'जी बिल्कुल! हमारे सभी अचार प्रयागराज में हमारी दादी-नानी की पारंपरिक रेसिपी के अनुसार, छोटे-छोटे बैच में हाथों से बनाए जाते हैं। कोई मशीन या फैक्ट्री का उपयोग नहीं होता।'
    },
    {
      q: 'अचार में कौन सा तेल और मसाले इस्तेमाल होते हैं?',
      a: 'हम केवल शुद्ध, कच्ची घानी (cold-pressed) सरसों का तेल और घर पर साफ करके पीसे गए उच्च गुणवत्ता वाले मसाले इस्तेमाल करते हैं। स्वाद और सेहत दोनों का ध्यान रखा जाता है।'
    },
    {
      q: 'क्या इसमें कोई प्रिजर्वेटिव (preservatives) या रंग मिलाया गया है?',
      a: 'नहीं, हमारे किसी भी अचार में कोई कृत्रिम रंग, विनेगर (सिरका) या रासायनिक प्रिजर्वेटिव नहीं है। शुद्ध सरसों का तेल और नमक ही इसे प्राकृतिक रूप से सुरक्षित रखते हैं।'
    },
    {
      q: 'अचार कितने दिन तक खराब नहीं होता (Shelf life)?',
      a: 'अगर आप इसे सूखे चम्मच से निकालें और नमी से बचाएं, तो हमारा अचार 12 महीने से ज्यादा समय तक बिल्कुल सही रहता है। तेल की परत अचार के ऊपर बनी रहनी चाहिए।'
    },
    {
      q: 'डिलीवरी और पैकेजिंग कैसे होती है?',
      a: 'हम अचार को सुरक्षित, लीक-प्रूफ फूड-ग्रेड ग्लास जार और मजबूत पैकेजिंग में डिलीवर करते हैं ताकि स्वाद और शुद्धता आप तक बिना किसी नुकसान के पहुंचे।'
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">आपके सवाल, हमारे जवाब (FAQ)</h2>
          <p className="text-on-surface/80">Everything you need to know about our traditional pickles.</p>
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-primary/5 p-4 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.q}
              answer={faq.a}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
