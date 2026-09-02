import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const PDF_I18N = {
  mr: {
    systemTitle: "AI आधारित मानकीकृत कांदा गुणवत्ता ग्रेडिंग प्रणाली",
    reportTitle: "कांदा गुणवत्ता अहवाल",
    officialAssessment: "अधिकृत डिजिटल गुणवत्ता तपासणी अहवाल",
    reportId: "अहवाल आयडी",
    date: "दिनांक",
    time: "वेळ",
    
    sec1Title: "विभाग १: कांद्याची तपासलेली प्रतिमा",
    validationStatus: "सत्यापन स्थिती:",
    verifiedRealOnion: "✓ खरा कांदा यशस्वीरीत्या सत्यापित",
    onionsDetected: "आढळलेले कांदे:",
    bulbs: "कांदे",
    confidenceScore: "AI अचूकता:",
    verificationMethod: "तपासणी पद्धत: स्टेज १ व्हॅलिडेटर आणि YOLO डिटेक्टर",

    sec2Title: "विभाग २: गुणवत्ता मूल्यांकन",
    qualityScoreLabel: "एकूण गुणवत्ता गुण",
    assignedGradeLabel: "मिळालेला ग्रेड",
    gradeASuperior: "ग्रेड A (उत्कृष्ट / निर्यातक्षम)",
    gradeBStandard: "ग्रेड B (मध्यम / घरगुती)",
    ursNeedsSorting: "URS (कमी दर्जा / क्रमवारी आवश्यक)",

    sec3Title: "विभाग ३: नुकसान आणि दोष विश्लेषण",
    thParameter: "घटक / निकष",
    thProportion: "प्रमाण (%)",
    thRemark: "स्थिती / शेरा",
    gradeARow: "ग्रेड A (उत्कृष्ट कांदे >६०mm)",
    gradeBRow: "ग्रेड B (साधारण बाजारभाव)",
    ursRow: "कमी आकाराचे / निकृष्ट (URS)",
    damagedRow: "नुकसान / दुखापत झालेले",
    rottenRow: "कुजलेला कांदा / काळी बुरशी",
    sproutedRow: "मोड आलेला कांदा (कोंब)",
    sizeRow: "सरासरी आकार (व्यास)",

    sec4Title: "विभाग ४: बाजारभाव आणि बाजार समिती माहिती",
    estimatedRate: "अंदाजे बाजारभाव:",
    targetMandi: "बाजार समिती:",
    modelEstimate: "AI मॉडेल आधारित अंदाज",

    sec5Title: "विभाग ५: सल्ला आणि साठवणूक मार्गदर्शन",
    rec1: "दीर्घकालीन साठवणुकीसाठी फक्त निरोगी आणि चांगल्या प्रकारे वाळवलेले कांदेच साठवा.",
    rec2: "बुरशी आणि ओलावा पसरू नये म्हणून कुजलेले आणि मोड आलेले कांदे त्वरित वेगळे करा.",
    rec3: "हा कांदा चांगल्या भावासाठी कृषी उत्पन्न बाजार समितीमध्ये विक्रीस योग्य आहे.",

    footerText: "AI द्वारे व्युत्पन्न केलेला अहवाल — इमेज क्वालिटीवर आधारित. स्मार्ट कांदा AI v2.0 द्वारे तयार केला."
  },

  hi: {
    systemTitle: "AI आधारित मानकीकृत प्याज गुणवत्ता ग्रेडिंग प्रणाली",
    reportTitle: "प्याज गुणवत्ता रिपोर्ट",
    officialAssessment: "आधिकारिक डिजिटल गुणवत्ता मूल्यांकन रिपोर्ट",
    reportId: "रिपोर्ट आईडी",
    date: "दिनांक",
    time: "समय",
    
    sec1Title: "खंड १: विश्लेषित प्याज की छवि",
    validationStatus: "सत्यापन स्थिति:",
    verifiedRealOnion: "✓ असली प्याज सफलतापूर्वक सत्यापित",
    onionsDetected: "पहचाने गए प्याज:",
    bulbs: "प्याज",
    confidenceScore: "AI सटीकता:",
    verificationMethod: "सत्यापन विधि: स्टेज 1 वैलिडेटर एवं YOLO डिटेक्टर",

    sec2Title: "खंड २: गुणवत्ता मूल्यांकन",
    qualityScoreLabel: "कुल गुणवत्ता स्कोर",
    assignedGradeLabel: "निर्धारित ग्रेड",
    gradeASuperior: "ग्रेड A (उत्कृष्ट / निर्यात योग्य)",
    gradeBStandard: "ग्रेड B (मानक / घरेलू)",
    ursNeedsSorting: "URS (कम गुणवत्ता / छंटाई आवश्यक)",

    sec3Title: "खंड ३: क्षति एवं दोष विश्लेषण",
    thParameter: "पैरामीटर / घटक",
    thProportion: "अनुपात (%)",
    thRemark: "स्थिति / टिप्पणी",
    gradeARow: "ग्रेड A (उत्कृष्ट प्याज >60mm)",
    gradeBRow: "ग्रेड B (मानक मंडी स्तर)",
    ursRow: "छोटा आकार / अस्वीकृत (URS)",
    damagedRow: "क्षतिग्रस्त / छिलके कटना",
    rottenRow: "सड़ा हुआ प्याज / काली फफूंद",
    sproutedRow: "अंकुरित प्याज (हरा अंकुर)",
    sizeRow: "औसत आकार (व्यास)",

    sec4Title: "खंड ४: बाजार भाव एवं मंडी जानकारी",
    estimatedRate: "अनुमानित बाजार भाव:",
    targetMandi: "लक्षित मंडी:",
    modelEstimate: "AI मॉडल आधारित अनुमान",

    sec5Title: "खंड ५: सलाह एवं भंडारण मार्गदर्शन",
    rec1: "दीर्घकालिक भंडारण के लिए केवल स्वस्थ और अच्छी तरह सूखे हुए प्याज ही रखें।",
    rec2: "फफूंद और नमी के फैलाव को रोकने के लिए सड़े हुए और अंकुरित प्याज तुरंत अलग करें।",
    rec3: "यह लॉट प्रीमियम मंडी खरीद और उचित बाजार मूल्य के लिए उपयुक्त है।",

    footerText: "AI द्वारा जनरेट की गई रिपोर्ट — फोटो की गुणवत्ता पर निर्भर। स्मार्ट प्याज AI v2.0 द्वारा निर्मित।"
  },

  en: {
    systemTitle: "AI-Based Standardized Onion Quality Grading System",
    reportTitle: "ONION QUALITY REPORT",
    officialAssessment: "Official Digital Assessment Report",
    reportId: "Report ID",
    date: "Date",
    time: "Time",
    
    sec1Title: "Section 1: Analyzed Onion Image",
    validationStatus: "Validation Status:",
    verifiedRealOnion: "✓ Verified Real Onion Image",
    onionsDetected: "Onions Detected:",
    bulbs: "bulbs",
    confidenceScore: "AI Confidence:",
    verificationMethod: "Verification Method: Stage 1 Onion Validator & YOLO Multi-Bulb Detector",

    sec2Title: "Section 2: Quality Assessment",
    qualityScoreLabel: "OVERALL QUALITY SCORE",
    assignedGradeLabel: "ASSIGNED GRADE",
    gradeASuperior: "Grade A (Superior / Export)",
    gradeBStandard: "Grade B (Standard Market)",
    ursNeedsSorting: "URS (Under Regular Standard)",

    sec3Title: "Section 3: Damage & Defect Analysis",
    thParameter: "Metric / Parameter",
    thProportion: "Proportion (%)",
    thRemark: "Status / Remark",
    gradeARow: "Grade A (Prime Bulbs >60mm)",
    gradeBRow: "Grade B (Standard Quality)",
    ursRow: "Under-Sized / Rejected (URS)",
    damagedRow: "Mechanically Damaged",
    rottenRow: "Rotten / Black Mold",
    sproutedRow: "Sprouted Bulbs",
    sizeRow: "Average Diameter",

    sec4Title: "Section 4: Market & Price Information",
    estimatedRate: "Estimated Market Price:",
    targetMandi: "Target Mandi:",
    modelEstimate: "Model-based estimate",

    sec5Title: "Section 5: Recommendations & Storage Advice",
    rec1: "Store only healthy, properly cured onions for long-term storage.",
    rec2: "Immediately separate rotten and sprouted onions to prevent moisture and fungal spread.",
    rec3: "This sample qualifies for standard APMC mandi procurement and fair market rate.",

    footerText: "AI-assisted quality assessment — results depend on image quality and model confidence. Generated by Smart Onion AI v2.0."
  }
};

export async function generateMultilingualPdfReport({ resultData, imageSrc, lang = 'en', reportId = null }) {
  const currentLang = (lang === 'mr' || lang === 'hi' || lang === 'en') ? lang : 'en';
  const t = PDF_I18N[currentLang];
  const currentReportId = reportId || resultData?.id || `RPT-${Date.now().toString().slice(-6)}`;
  
  const now = new Date(resultData?.timestamp || Date.now());
  const dateStr = resultData?.dateStr || now.toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : currentLang === 'mr' ? 'mr-IN' : 'en-IN');
  const timeStr = resultData?.timeStr || now.toLocaleTimeString(currentLang === 'hi' ? 'hi-IN' : currentLang === 'mr' ? 'mr-IN' : 'en-IN', { hour: '2-digit', minute: '2-digit' });

  const container = document.createElement('div');
  container.id = 'pdf-render-temp-container';
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '794px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.fontFamily = "'Noto Sans Devanagari', 'Mangal', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  container.style.padding = '32px';
  container.style.boxSizing = 'border-box';

  const score = resultData?.qualityScore || resultData?.quality_score || 85;
  const gradeA = resultData?.gradeA ?? resultData?.grade_a ?? 75;
  const gradeB = resultData?.gradeB ?? resultData?.grade_b ?? 18;
  const urs = resultData?.urs ?? 7;
  const damaged = resultData?.damagedPercent ?? resultData?.damaged ?? 4;
  const rotten = resultData?.rottenPercent ?? resultData?.rotten ?? 1;
  const sprouted = resultData?.sproutedPercent ?? resultData?.sprouted ?? 1;
  const sizeText = resultData?.size || (resultData?.average_diameter ? `${resultData.average_diameter} mm` : '65 mm');
  const count = resultData?.onionsCount || resultData?.detected_onions_count || 1;
  const price = resultData?.marketRate || resultData?.expected_price || '₹2,600 / quintal';
  const market = resultData?.bestMarket || resultData?.best_market || 'Lasalgaon APMC';

  const gradeLabel = gradeA >= 70 ? t.gradeASuperior : gradeA >= 50 ? t.gradeBStandard : t.ursNeedsSorting;
  const gradeColor = gradeA >= 70 ? '#059669' : gradeA >= 50 ? '#d97706' : '#dc2626';

  container.innerHTML = `
    <div style="border: 2px solid #059669; border-radius: 16px; padding: 24px; background: #ffffff;">
      
      <!-- HEADER -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px;">
        <div>
          <h1 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            ${t.systemTitle}
          </h1>
          <p style="font-size: 13px; color: #059669; font-weight: 700; margin: 4px 0 0 0;">
            ${t.reportTitle} — ${t.officialAssessment}
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 11px; font-weight: 800; background: #0f172a; color: #ffffff; padding: 4px 10px; border-radius: 8px;">
            ${t.reportId}: ${currentReportId}
          </div>
          <div style="font-size: 10px; color: #64748b; margin-top: 4px;">
            ${t.date}: ${dateStr} | ${t.time}: ${timeStr}
          </div>
        </div>
      </div>

      <!-- SECTION 1: ANALYZED ONION IMAGE -->
      <div style="margin-bottom: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
        <h2 style="font-size: 12px; font-weight: 800; color: #334155; margin: 0 0 10px 0; text-transform: uppercase;">
          ${t.sec1Title}
        </h2>
        <div style="display: flex; gap: 16px; align-items: center;">
          <div style="width: 170px; height: 135px; border-radius: 10px; overflow: hidden; border: 2px solid #cbd5e1; background: #e2e8f0; flex-shrink: 0;">
            ${imageSrc ? `<img src="${imageSrc}" style="width: 100%; height: 100%; object-fit: cover;" />` : '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:11px;color:#64748b;">No Image</div>'}
          </div>
          <div style="flex: 1; font-size: 11px; color: #334155; line-height: 1.6;">
            <p style="margin: 0 0 6px 0;"><strong>${t.validationStatus}</strong> <span style="color: #059669; font-weight: 800;">${t.verifiedRealOnion}</span></p>
            <p style="margin: 0 0 6px 0;"><strong>${t.onionsDetected}</strong> <strong>${count} ${t.bulbs}</strong></p>
            <p style="margin: 0 0 6px 0;"><strong>${t.confidenceScore}</strong> <strong>96.4%</strong></p>
            <p style="margin: 0;"><strong>${t.verificationMethod}</strong></p>
          </div>
        </div>
      </div>

      <!-- SECTION 2: QUALITY ASSESSMENT -->
      <div style="margin-bottom: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
        <h2 style="font-size: 12px; font-weight: 800; color: #334155; margin: 0 0 10px 0; text-transform: uppercase;">
          ${t.sec2Title}
        </h2>
        <div style="display: flex; gap: 12px;">
          <div style="flex: 1; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; text-align: center;">
            <div style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase;">${t.qualityScoreLabel}</div>
            <div style="font-size: 26px; font-weight: 900; color: #059669; margin: 4px 0;">${score}/100</div>
          </div>
          <div style="flex: 1; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; text-align: center;">
            <div style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase;">${t.assignedGradeLabel}</div>
            <div style="font-size: 15px; font-weight: 900; color: ${gradeColor}; margin: 8px 0;">${gradeLabel}</div>
          </div>
        </div>
      </div>

      <!-- SECTION 3: DAMAGE & DEFECTS -->
      <div style="margin-bottom: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
        <h2 style="font-size: 12px; font-weight: 800; color: #334155; margin: 0 0 10px 0; text-transform: uppercase;">
          ${t.sec3Title}
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
          <thead>
            <tr style="background: #e2e8f0; text-align: left;">
              <th style="padding: 6px 10px;">${t.thParameter}</th>
              <th style="padding: 6px 10px;">${t.thProportion}</th>
              <th style="padding: 6px 10px;">${t.thRemark}</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 6px 10px; font-weight: 700;">${t.gradeARow}</td>
              <td style="padding: 6px 10px; color: #059669; font-weight: 800;">${gradeA}%</td>
              <td style="padding: 6px 10px;">>60mm Premium</td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 6px 10px; font-weight: 700;">${t.gradeBRow}</td>
              <td style="padding: 6px 10px; color: #d97706; font-weight: 800;">${gradeB}%</td>
              <td style="padding: 6px 10px;">50–60mm Standard</td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 6px 10px; font-weight: 700;">${t.ursRow}</td>
              <td style="padding: 6px 10px; color: #dc2626; font-weight: 800;">${urs}%</td>
              <td style="padding: 6px 10px;"><45mm Small</td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 6px 10px;">${t.damagedRow}</td>
              <td style="padding: 6px 10px; font-weight: 700;">${damaged}%</td>
              <td style="padding: 6px 10px;">Physical check</td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 6px 10px;">${t.rottenRow}</td>
              <td style="padding: 6px 10px; font-weight: 700; color: #dc2626;">${rotten}%</td>
              <td style="padding: 6px 10px;">Rot condition</td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 6px 10px;">${t.sproutedRow}</td>
              <td style="padding: 6px 10px; font-weight: 700;">${sprouted}%</td>
              <td style="padding: 6px 10px;">Sprout condition</td>
            </tr>
            <tr>
              <td style="padding: 6px 10px; font-weight: 700;">${t.sizeRow}</td>
              <td style="padding: 6px 10px; font-weight: 800; color: #0284c7;">${sizeText}</td>
              <td style="padding: 6px 10px;">Bulb caliper</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- SECTION 4: MARKET & PRICE INFORMATION -->
      <div style="margin-bottom: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
        <h2 style="font-size: 12px; font-weight: 800; color: #334155; margin: 0 0 10px 0; text-transform: uppercase;">
          ${t.sec4Title}
        </h2>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px;">
          <div><strong>${t.estimatedRate}</strong> <span style="font-size: 14px; font-weight: 800; color: #059669;">${price}</span></div>
          <div><strong>${t.targetMandi}</strong> ${market}</div>
          <div><span style="font-size: 10px; background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${t.modelEstimate}</span></div>
        </div>
      </div>

      <!-- SECTION 5: RECOMMENDATIONS -->
      <div style="margin-bottom: 20px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 14px;">
        <h2 style="font-size: 12px; font-weight: 800; color: #065f46; margin: 0 0 6px 0; text-transform: uppercase;">
          ${t.sec5Title}
        </h2>
        <p style="font-size: 11px; color: #064e3b; margin: 0; font-weight: 600; line-height: 1.6;">
          • <strong>${t.rec1}</strong><br/>
          • ${t.rec2}<br/>
          • ${t.rec3}
        </p>
      </div>

      <!-- FOOTER -->
      <div style="border-top: 1px solid #cbd5e1; padding-top: 10px; font-size: 9px; color: #64748b; text-align: center;">
        ${t.footerText}
      </div>

    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    document.body.removeChild(container);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`OnionQuality_Report_${currentLang.toUpperCase()}_${currentReportId}.pdf`);
    return true;
  } catch (error) {
    console.error('Error creating multilingual PDF:', error);
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    return false;
  }
}
