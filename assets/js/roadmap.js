/**
 * Roadmap Data and UI Manager
 * Handles database creation, domain mapping, vendor grouping, and rendering
 * for both Level 1 (Main Roadmap) and Levels 2-4 (Domain Roadmap) pages.
 */

const certLinks = {
  'A+': 'https://www.comptia.org/certifications/a',
  'ACE': 'https://accessdata.com/training/computer-forensics-certification',
  'APMG 20000A': 'https://apmg-international.com/product/iso-iec-20000',
  'APMG 20000F': 'https://apmg-international.com/product/iso-20000',
  'APMG 20000P': 'https://apmg-international.com/product/iso-iec-20000',
  'APMG 27001A': 'https://apmg-international.com/product/isoiec-27001',
  'APMG 27001F': 'https://apmg-international.com/product/isoiec-27001',
  'APMG 27001P': 'https://apmg-international.com/product/isoiec-27001',
  'APPLE ACSP': 'https://training.apple.com/us/en/recognition',
  'ASIS APP': 'https://www.asisonline.org/certification/associate-protection-professional-app/',
  'ASIS CPP': 'https://www.asisonline.org/certification/certified-protection-professional-cpp/',
  'ASIS PCI': 'https://www.asisonline.org/certification/professional-certified-investigator-pci',
  'AWS CP': 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
  'AWS CSS': 'https://aws.amazon.com/certification/certified-security-specialty/',
  'AWS SAA': 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
  'AWS SAP': 'https://aws.amazon.com/certification/certified-solutions-architect-professional/',
  'AZ-104': 'https://docs.microsoft.com/en-us/learn/certifications/azure-administrator?wt.mc_id=learningredirect_certs-web-wwl',
  'AZ-220': 'https://docs.microsoft.com/en-us/learn/certifications/azure-iot-developer-specialty?wt.mc_id=learningredirect_certs-web-wwl',
  'AZ-305': 'https://docs.microsoft.com/en-us/learn/certifications/azure-solutions-architect?wt.mc_id=learningredirect_certs-web-wwl',
  'AZ-500': 'https://docs.microsoft.com/en-us/learn/certifications/azure-security-engineer?wt.mc_id=learningredirect_certs-web-wwl',
  'AZ-900': 'https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals',
  'BCS FISMP': 'https://www.bcs.org/get-qualified/certifications-for-professionals/information-security-and-ccp-scheme-certifications/bcs-foundation-certificate-in-information-security-management-principles/',
  'BCS PCIAA': 'https://www.bcs.org/get-qualified/certifications-for-professionals/information-security-and-ccp-scheme-certifications/bcs-practitioner-certificate-in-information-assurance-architecture/',
  'BCS PCIRM': 'https://www.bcs.org/get-qualified/certifications-for-professionals/information-security-and-ccp-scheme-certifications/bcs-practitioner-certificate-in-information-risk-management/',
  'BSCP': 'https://portswigger.net/web-security/certification',
  'BTL1': 'https://www.securityblue.team/why-btl1/',
  'BTL2': 'https://securityblue.team/btl2/',
  'C CS F': 'https://www.itgovernance.co.uk/shop/product/certified-cyber-security-foundation-training-course',
  'C)CSA': 'https://www.mile2.com/ccsa_outline/',
  'C)CSO': 'https://mile2.com/ccso_outline/',
  'C)DFE': 'https://www.mile2.com/cdfe_outline/',
  'C)DRE': 'https://www.mile2.com/cdre_outline/',
  'C)HISSP': 'https://www.mile2.com/chissp_outline/',
  'C)IHE': 'https://www.mile2.com/cihe_outline/',
  'C)ISCAP': 'https://www.mile2.com/iscap_outline/',
  'C)ISMS-LA': 'https://www.mile2.com/cisms-la-li-outline/',
  'C)ISRM': 'https://www.mile2.com/information-systems-risk-mangager-outline/',
  'C)ISSA': 'https://www.mile2.com/information_systems_security_auditor_outline/',
  'C)ISSM': 'https://mile2.com/cissm_outline/',
  'C)ISSO': 'https://www.mile2.com/cisso_outline/',
  'C)NFE': 'https://www.mile2.com/network-forensics-examiner-outline/',
  'C)PEH': 'https://mile2.com/professional-ethical-hacker/',
  'C)PSH': 'https://www.mile2.com/cpSH_outline/',
  'C)PTC': 'https://mile2.com/cptc_outline/',
  'C)PTE': 'https://www.mile2.com/penetration-testing-engineer-outline/',
  'C)SLO': 'https://www.mile2.com/cslo_outline/',
  'C)SP': 'https://www.mile2.com/csp_outline/',
  'C)SWAE': 'https://www.mile2.com/cswae_outline/',
  'C)TIA': 'https://www.mile2.com/threat-analyst/',
  'C)VA': 'https://www.mile2.com/vulnerability-assessor-outline/',
  'CAC': 'https://gaqm.org/certifications/scrum_agile/cac',
  'CACE': 'https://www.exidacace.com/Apply/CACE',
  'CACS': 'https://www.exidacace.com/Apply/CACS',
  'CAD': 'https://gaqm.org/certifications/scrum_agile/cad',
  'CAMS': 'https://www.identitymanagementinstitute.org/cams/',
  'CAPM': 'https://www.pmi.org/certifications/types/certified-associate-capm',
  'CASE': 'https://www.eccouncil.org/programs/certified-application-security-engineer-case/',
  'CASM': 'https://gaqm.org/certifications/scrum_agile/casm',
  'CASP+': 'https://www.comptia.org/certifications/comptia-advanced-security-practitioner',
  'CASST': 'https://gaqm.org/certifications/software_security_testing/casst',
  'CAWFE': 'https://www.iacis.com/certification/cawfe/',
  'CC': 'https://www.isc2.org/Certifications/CC',
  'CCD': 'https://cyberdefenders.org/blue-team-training/courses/certified-cyberdefender-certification/',
  'CCDE': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccde.html',
  'CCE': 'https://www.isfce.com/certification.htm',
  'CCFE': 'https://app.infosecinstitute.com/portal/courses/a0t1A000009H5RcQAK',
  'CCIE ENT': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccie-security-v2.html',
  'CCIE SEC': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccie-security.html',
  'CCISO': 'https://ciso.eccouncil.org/cciso-certification/',
  'CCNA': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html',
  'CCNP ENT': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-enterprise.html',
  'CCNP SEC': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-security-v2.html',
  'CCOA': 'https://www.isaca.org/credentialing/ccoa',
  'CCP': 'https://ecfirst.biz/index.php?route=product/product&path=59_83&product_id=281',
  'CCPENX-AWS': 'https://secops.group/product/certified-cloud-pentesting-expert/',
  'CCRMP': 'https://www.itgovernance.co.uk/shop/product/managing-cyber-security-risk-training-course',
  'CCSA': 'https://training-certifications.checkpoint.com/#/courses/Check%20Point%20Certified%20Admin%20(CCSA',
  'CCSC': 'https://certnexus.com/certification/cyber-secure-coder/',
  'CCSE': 'https://cert.eccouncil.org/certified-cloud-security-engineer.html',
  'CCSM': 'https://training-certifications.checkpoint.com/#/courses/Check%20Point%20Certified%20Master%20(CCSM',
  'CCSP': 'https://www.isc2.org/Certifications/CCSP',
  'CCT': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/entry/technician-cct.html',
  'CDP': 'https://www.identitymanagementinstitute.org/cdp/',
  'CDPSE': 'https://www.isaca.org/credentialing/certified-data-privacy-solutions-engineer',
  'CDRP': 'https://app.infosecinstitute.com/portal/courses/a0tC0000000FovhIAC',
  'CEH': 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/',
  'CFA': 'https://gaqm.org/certifications/information_systems_security/cfa',
  'CFCE': 'https://www.iacis.com/certification/',
  'CFR': 'https://certnexus.com/certification/cybersec-first-responder/',
  'CFSR': 'https://www.opentext.com/products-and-solutions/services/training-and-learning-services/encase-training/forensic-security-responder-certification',
  'CGEIT': 'https://www.isaca.org/credentialing/cgeit',
  'CGRC': 'https://www.isc2.org/Certifications/CGRC',
  'CHA': 'https://www.isecom.org/certification.html',
  'CHAT': 'https://www.isecom.org/certification.html',
  'CHFI': 'https://www.eccouncil.org/programs/computer-hacking-forensic-investigator-chfi/',
  'CIAM': 'https://www.identitymanagementinstitute.org/ciam/',
  'CIDPRO': 'https://idpro.org/cidpro/',
  'CIGE': 'https://www.identitymanagementinstitute.org/cige/',
  'CIISEC ICSF': 'https://www.ciisec.org/ICSF_Exam',
  'CIMP': 'https://www.identitymanagementinstitute.org/cimp/',
  'CIOTSP': 'https://certnexus.com/certification/ciotsp/',
  'CIPA': 'https://www.identitymanagementinstitute.org/cipa/',
  'CIPP': 'https://iapp.org/certify/cipp',
  'CIPT': 'https://iapp.org/certify/cipt/',
  'CIRM FDN': 'https://www.itgovernance.co.uk/shop/product/cyber-incident-response-management-foundation-training-course',
  'CIS F': 'https://www.itgovernance.co.uk/shop/product/certified-iso-27001-isms-foundation-training-course',
  'CIS IA': 'https://www.itgovernance.co.uk/shop/product/iso27001-certified-isms-internal-auditor-training-course',
  'CIS LA': 'https://www.itgovernance.co.uk/shop/product/certified-iso-27001-isms-lead-auditor-training-course',
  'CIS LI': 'https://www.itgovernance.co.uk/shop/product/certified-iso-27001-isms-lead-implementer-training-course',
  'CIS RM': 'https://www.itgovernance.co.uk/shop/product/iso-27005-certified-isms-risk-management',
  'CISA': 'https://www.isaca.org/credentialing/cisa',
  'CISCO COA': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/cyberops-associate.html',
  'CISCO COP': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/cyberops-professional.html',
  'CISM': 'https://www.isaca.org/credentialing/cism',
  'CISP': 'https://gaqm.org/certifications/information_systems_security/cisp',
  'CISRM': 'https://www.itgovernance.co.uk/shop/product/iso-27005-certified-isms-risk-management',
  'CISSM': 'https://gaqm.org/certifications/information_systems_security/cissm',
  'CISSP': 'https://www.isc2.org/Certifications/CISSP',
  'CISSP CONCENTRATIONS': 'https://www.isc2.org/certifications#Specialized',
  'CISST': 'https://gaqm.org/certifications/information_systems_security/cisst',
  'CIST': 'https://www.identitymanagementinstitute.org/cist/',
  'CITGP': 'https://www.itgovernance.co.uk/shop/product/implementing-it-governance-foundation-principles-training-course',
  'CKA': 'https://www.cncf.io/certification/cka/',
  'CKAD': 'https://www.cncf.io/certification/ckad/',
  'CKS': 'https://www.cncf.io/certification/cks/',
  'CLCSM': 'https://pecb.com/en/education-and-certification-for-individuals/cloud-security/lead-cloud-security-manager',
  'CLOUD ESSNT': 'https://www.comptia.org/certifications/cloud-essentials',
  'CLOUD+': 'https://www.comptia.org/certifications/cloud',
  'CM)DFI': 'https://www.mile2.com/master-certifications/',
  'CM)IPS': 'https://www.mile2.com/master-certifications/',
  'CM)ISSO': 'https://www.mile2.com/master-certifications/',
  'CMFE': 'https://app.infosecinstitute.com/portal/courses/a0t1A000009H6juQAC',
  'CMWAPT': 'https://app.infosecinstitute.com/portal/courses/a0tC0000000Fow6IAC',
  'CND': 'https://www.eccouncil.org/programs/certified-network-defender-cnd/',
  'CNDA': 'https://www.eccouncil.org/programs/certified-network-defense-architect-cnda/',
  'CPD': 'https://gaqm.org/certifications/project_management/cpd',
  'CPENT': 'https://www.eccouncil.org/programs/certified-penetration-testing-professional-cpent/',
  'CREA': 'https://app.infosecinstitute.com/portal/courses/a0tC0000000Fp4IIAS',
  'CREST CCHIA': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-host-intrusion-analyst',
  'CREST CCNIA': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-network-intrusion-analyst',
  'CREST CCSAS': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-simulated-attack-specialist',
  'CREST CCTAPP': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-web-application-tester/',
  'CREST CCTIM': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-threat-intelligence-manager',
  'CREST CPIA': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-practitioner-intrusion-analyst',
  'CREST CPSA': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-practitioner-security-analyst',
  'CREST CPTIA': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-practitioner-threat-intelligence-analyst/',
  'CREST CRIA': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-registered-intrusion-analyst',
  'CREST CRT': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-registered-penetration-tester',
  'CREST CRTIA': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-registered-threat-intelligence-analyst',
  'CREST CRTSA': 'https://www.crest-approved.org/examination/technical-security-architecture/index.html',
  'CREST CSAM': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-simulated-attack-manager',
  'CREST CSAS': 'https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-simulated-attack-specialist',
  'CRFS': 'https://www.identitymanagementinstitute.org/crfs/',
  'CRISC': 'https://www.isaca.org/credentialing/crisc',
  'CRTO': 'https://courses.zeropointsecurity.co.uk/courses/red-team-ops',
  'CRTO II': 'https://training.zeropointsecurity.co.uk/courses/red-team-ops-ii',
  'CRTOP': 'https://app.infosecinstitute.com/portal/courses/a0t0y00000BK8IcAAL',
  'CSA': 'https://www.eccouncil.org/programs/certified-soc-analyst-csa/',
  'CSA CCSK': 'https://cloudsecurityalliance.org/education/ccsk/',
  'CSA CGC': 'https://cloudsecurityalliance.org/education/cloud-governance-and-compliance/',
  'CSAE': 'https://cyberstruggle.org/aegis-certification/',
  'CSAP': 'https://app.infosecinstitute.com/portal/courses/a0t0y000009lTzjAAE',
  'CSBA': 'https://www.softwarecertifications.org/csba/',
  'CSCS': 'https://ecfirst.biz/index.php?route=product/product&path=59_61&product_id=89',
  'CSCU': 'https://www.eccouncil.org/Certification/certified-secure-computer-user',
  'CSFA': 'https://www.csiac.org/certification/cybersecurity-forensic-analyst-csfa-certification/',
  'CSM': 'https://gaqm.org/certifications/scrum_agile/csm',
  'CSP': 'https://gaqm.org/certifications/scrum_agile/csp-410',
  'CSR': 'https://cyberstruggle.org/ranger-certification/',
  'CSSA': 'https://app.infosecinstitute.com/portal/courses/a0tC0000000Fp4JIAS',
  'CSSLP': 'https://www.isc2.org/Certifications/CSSLP',
  'CSST': 'https://gaqm.org/certifications/software_security_testing/csst',
  'CSTL': 'https://thecyberscheme.org/cyber-scheme-team-leader-cstl-exam/',
  'CSTM': 'https://thecyberscheme.org/cyber-scheme-team-member-cstm-exam/',
  'CSX-F': 'https://www.itgovernance.co.uk/shop/product/cyber-incident-response-management-foundation-training-course',
  'CSX-P': 'https://cybersecurity.isaca.org/csx-certifications/csx-practitioner-certification',
  'CTIA': 'https://www.eccouncil.org/programs/certified-threat-intelligence-analyst-ctia/',
  'CTPRA': 'https://sharedassessments.org/ctpra/',
  'CTPRP': 'https://sharedassessments.org/ctprp/',
  'CWSP': 'https://www.cwnp.com/certifications/cwsp',
  'CYSA+': 'https://www.comptia.org/certifications/cybersecurity-analyst',
  'DACRP': 'https://drii.org/certification/acrp',
  'DCA': 'https://training.mirantis.com/dca-certification-exam/',
  'DCBCA': 'https://drii.org/certification/cbca',
  'DCBCLA': 'https://drii.org/certification/cbcla',
  'DCCRP': 'https://drii.org/certification/ccrp',
  'DCPP': 'https://www.dsci.in/content/dsci-certified-privacy-professional-dcpp',
  'DCRMP': 'https://drii.org/certification/crmp',
  'DEVNET A': 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/devnet/associate/index.html',
  'DEVNET PRO': 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/devnet/professional/index.html',
  'DV AOPH': 'https://0xdarkvortex.dev/training-programs/adversary-operations-and-proactive-hunting/',
  'DV MILF': 'https://0xdarkvortex.dev/training-programs/malware-incident-and-log-forensics/',
  'DV MOS': 'https://0xdarkvortex.dev/training-programs/malware-on-steroids/#certification',
  'DV OTD': 'https://0xdarkvortex.dev/training-programs/offensive-tool-development/',
  'DV RTOS': 'https://0xdarkvortex.dev/training-programs/red-team-and-operational-security/',
  'ECDFP': 'https://security.ine.com/certifications/ecdfp-certification/',
  'ECES': 'https://www.eccouncil.org/programs/ec-council-certified-encryption-specialist-eces/',
  'ECIH': 'https://www.eccouncil.org/programs/ec-council-certified-incident-handler-ecih/',
  'ECIR': 'https://security.ine.com/certifications/ecir-certification/',
  'ECPPT': 'https://security.ine.com/certifications/ecppt-certification/',
  'ECSS': 'https://www.eccouncil.org/programs/certified-security-specialist-ecss/',
  'ECTHP': 'https://security.ine.com/certifications/ecthp-certification/',
  'EDRP': 'https://www.eccouncil.org/programs/disaster-recovery-professional-edrp/',
  'EEHF': 'https://www.exin.com/certifications/exin-ethical-hacking-foundation-exam',
  'EEXIN ISM': 'https://www.exin.com/certifications/information-security-management-expert-based-isoiec-27001-exam',
  'EISM': 'https://ciso.eccouncil.org/cciso-certification/eism-program/',
  'EITCA/IS': 'https://eitca.org/eitca-is-information-security-academy/',
  'EJPT': 'https://ine.com/learning/certifications/internal/elearnsecurity-junior-penetration-tester-v2',
  'EMAPT': 'https://security.ine.com/certifications/emapt-certification/',
  'ENCE': 'https://www.opentext.com/products-and-solutions/services/training-and-learning-services/encase-training/examiner-certification',
  'ENDP': 'https://www.elearnsecurity.com/certification/endp/',
  'EPDPE': 'https://www.exin.com/certifications/exin-privacy-and-data-protection-essentials-exam',
  'EPDPF': 'https://www.exin.com/certifications/exin-privacy-and-data-protection-foundation-exam',
  'EPDPP': 'https://embed.exin.totalservices.io/certifications/exin-privacy-and-data-protection-practitioner-exam',
  'EWPT': 'https://security.ine.com/certifications/ewpt-certification/',
  'EWPTX': 'https://elearnsecurity.com/product/ewptxv2-certification/',
  'EXIN 27001E': 'https://www.exin.com/certifications/information-security-management-expert-based-isoiec-27001-exam?language_content_entity=en',
  'EXIN 27001F': 'https://www.exin.com/certifications/information-security-foundation-based-iso-iec-27001-exam',
  'EXIN 27001P': 'https://www.exin.com/certifications/information-security-management-professional-based-isoiec-27001-exam',
  'EXIN CIT': 'https://www.exin.com/qualification-program/exin-cyber-and-it-security',
  'EXIN PCA': 'https://www.exin.com/certifications/ccc-professional-cloud-administrator-exam',
  'EXIN PCD': 'https://www.exin.com/certifications/ccc-professional-cloud-developer-exam',
  'EXIN PCSA': 'https://www.exin.com/certifications/ccc-professional-cloud-solution-architect-exam',
  'EXIN PCSERM': 'https://www.exin.com/certifications/ccc-professional-cloud-service-manager-exam',
  'EXIN PCSM': 'https://www.exin.com/certifications/ccc-professional-cloud-security-manager-exam',
  'F5 CA': 'https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740',
  'F5 CSE SEC': 'https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740',
  'F5 CTS APM': 'https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740',
  'F5 CTS DNS': 'https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740',
  'FAIR FDN': 'https://risklens-academy.myshopify.com/collections/popular-courses/products/fair-analysis-fundamentals-2',
  'FCA': 'https://training.fortinet.com/local/staticpage/view.php?page=fca_cybersecurity',
  'FCF': 'https://training.fortinet.com/local/staticpage/view.php?page=fcf_cybersecurity',
  'FCP NS': 'https://training.fortinet.com/local/staticpage/view.php?page=fcp_network_security',
  'FCP PCS': 'https://training.fortinet.com/local/staticpage/view.php?page=fcp_public_cloud_security',
  'FCP SO': 'https://training.fortinet.com/local/staticpage/view.php?page=fcp_security_operations',
  'FCSS NS': 'https://training.fortinet.com/local/staticpage/view.php?page=fcss_network_security',
  'FCSS OT': 'https://training.fortinet.com/local/staticpage/view.php?page=fcss_ot_security',
  'FCSS PCS': 'https://training.fortinet.com/local/staticpage/view.php?page=fcss_public_cloud_security',
  'FCSS SASE': 'https://training.fortinet.com/local/staticpage/view.php?page=fcss_SASE',
  'FCSS SO': 'https://training.fortinet.com/local/staticpage/view.php?page=fcss_security_operations',
  'FCSS ZTA': 'https://training.fortinet.com/local/staticpage/view.php?page=fcss_zta',
  'FCX': 'https://training.fortinet.com/local/staticpage/view.php?page=fcx_cybersecurity',
  'FEXIN': 'https://www.exin.com/certifications/information-security-foundation-based-iso-iec-27001-exam?language_content_entity=en',
  'GASF': 'https://www.giac.org/certification/advanced-smartphone-forensics-gasf',
  'GAWN': 'https://www.giac.org/certification/gawn',
  'GBFA': 'https://www.giac.org/certification/gbfa',
  'GCCC': 'https://www.giac.org/certification/critical-controls-certification-gccc',
  'GCDA': 'https://www.giac.org/certification/certified-detection-analyst-gcda',
  'GCED': 'https://www.giac.org/certification/certified-enterprise-defender-gced',
  'GCFA': 'https://www.giac.org/certification/gcfa',
  'GCFE': 'https://www.giac.org/certification/gcfe',
  'GCFR': 'https://www.giac.org/certifications/cloud-forensics-responder-gcfr/',
  'GCIA': 'https://www.giac.org/certification/certified-intrusion-analyst-gcia',
  'GCIH': 'https://www.giac.org/certification/gcih',
  'GCIP': 'https://www.giac.org/certification/critical-infrastructure-protection-gcip',
  'GCLD': 'https://www.giac.org/certifications/cloud-security-essentials-gcld/',
  'GCPEH': 'https://gaqm.org/certifications/information_systems_security/cpeh',
  'GCPM': 'https://www.giac.org/certification/gcpm',
  'GCPN': 'https://www.giac.org/certification/gcpn',
  'GCPT': 'https://gaqm.org/certifications/information_systems_security/certified_penetration_tester_cpt',
  'GCSA': 'https://www.giac.org/certification/cloud-security-automation-gcsa',
  'GCTD': 'https://www.giac.org/certifications/cloud-threat-detection-gctd/',
  'GCTI': 'https://www.giac.org/certification/gcti',
  'GCWN': 'https://www.giac.org/certifications/certified-windows-security-administrator-gcwn/',
  'GDAT': 'https://www.giac.org/certification/defending-advanced-threats-gdat',
  'GDSA': 'https://www.giac.org/certification/defensible-security-architecture-gdsa',
  'GEIR': 'https://www.giac.org/certifications/enterprise-incident-responder-geir/',
  'GFACT': 'https://www.giac.org/certifications/foundational-cybersecurity-technologies-gfact/',
  'GICSP': 'https://www.giac.org/certification/global-industrial-cyber-security-professional-gicsp',
  'GIME': 'https://www.giac.org/certifications/ios-macos-examiner-gime/',
  'GISF': 'https://www.giac.org/certification/information-security-fundamentals-gisf',
  'GISP': 'https://www.giac.org/certification/gisp',
  'GLEG': 'https://www.giac.org/certification/law-data-security-investigations-gleg',
  'GMLE': 'https://www.giac.org/certifications/machine-learning-engineer-gmle/',
  'GMOB': 'https://www.giac.org/certification/mobile-device-security-analyst-gmob',
  'GMON': 'https://www.giac.org/certification/continuous-monitoring-certification-gmon',
  'GNFA': 'https://www.giac.org/certification/network-forensic-analyst-gnfa',
  'GOOGLE ACE': 'https://cloud.google.com/certification/cloud-engineer',
  'GOOGLE PCSA': 'https://cloud.google.com/certification/cloud-architect',
  'GOOGLE PCSE': 'https://cloud.google.com/certification/cloud-security-engineer',
  'GOSI': 'https://www.giac.org/certification/open-source-intelligence-gosi',
  'GPCS': 'https://www.giac.org/certifications/public-cloud-security-gpcs/',
  'GPEN': 'https://www.giac.org/certification/gpen',
  'GPYC': 'https://www.giac.org/certification/python-coder-gpyc',
  'GRCA': 'https://www.oceg.org/certifications/grc-audit-certification/',
  'GRCP': 'https://www.oceg.org/certifications/grc-professional-certification/',
  'GREM': 'https://www.giac.org/certifications/reverse-engineering-malware-grem/',
  'GRID': 'https://www.giac.org/certification/response-industrial-defense-grid',
  'GRTP': 'https://www.giac.org/certifications/red-team-professional-grtp/',
  'GSE': 'https://www.giac.org/get-certified/giac-portfolio-certifications/#GSE',
  'GSEC': 'https://www.giac.org/certification/security-essentials-gsec',
  'GSLC': 'https://www.giac.org/certification/gslc',
  'GSNA': 'https://www.giac.org/certification/gsna',
  'GSOC': 'https://www.giac.org/certifications/security-operations-certified-gsoc/',
  'GSP': 'https://www.giac.org/get-certified/giac-portfolio-certifications/#gsp',
  'GSTRT': 'https://www.giac.org/certification/gstrt',
  'GWAPT': 'https://www.giac.org/certification/gwapt',
  'GWEB': 'https://www.giac.org/certification/certified-web-application-defender-gweb',
  'GX-FA': 'https://www.giac.org/certifications/experienced-forensics-analyst-gxfa/',
  'GX-PT': 'https://www.giac.org/certifications/experienced-penetration-tester-gxpt/',
  'GXPN': 'https://www.giac.org/certification/gxpn',
  'HTB CBBH': 'https://academy.hackthebox.com/preview/certifications/htb-certified-bug-bounty-hunter/',
  'HTB CDSA': 'https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst',
  'HTB CPTS': 'https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist/',
  'HTB CWEE': 'https://academy.hackthebox.com/preview/certifications/htb-certified-web-exploitation-expert',
  'IIA CIA': 'https://na.theiia.org/certification/CIA-Certification/Pages/CIA-Certification.aspx',
  'IIBA CCA': 'https://www.iiba.org/certification/iiba-certifications/specialized-business-analysis-certifications/certificate-in-cybersecurity-analysis/',
  'IS20': 'https://www.mile2.com/is20_outline/',
  'ISA CAP': 'https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/',
  'ISA CDS': 'https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/',
  'ISA CE': 'https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/',
  'ISA CFS': 'https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/',
  'ISA CRAS': 'https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/',
  'ISMI CSM': 'https://www.ismi.org.uk/csmp/certified-security-manager%C2%AE',
  'ISMI CSMP': 'https://www.ismi.org.uk/csmp/csmp%C2%AE-overview.aspx',
  'ITIL FDN': 'https://www.axelos.com/certifications/itil-certifications/itil-foundation',
  'ITIL MASTER': 'https://www.axelos.com/certifications/itil-certifications/itil-master',
  'ITIL MP': 'https://www.axelos.com/certifications/itil-certifications/itil-managing-professional-itil-4',
  'ITIL SL': 'https://www.axelos.com/certifications/itil-certifications/itil-strategic-leader-itil-4',
  'ITS-C': 'https://certiport.filecamp.com/s/JTIy1sX0ci0ZI3ss/fi',
  'ITS-NS': 'https://certiport.filecamp.com/s/ITS_OD_102_Network_Security/fi',
  'JNCIA SEC': 'https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jnciasec',
  'JNCIE SEC': 'https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jnciesec',
  'JNCIP SEC': 'https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jncip-sec',
  'JNCIS SEC': 'https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jncisec',
  'KCNA': 'https://www.cncf.io/certification/kcna/',
  'KLCP': 'https://kali.training/klcp/',
  'LFCA': 'https://training.linuxfoundation.org/certification/certified-it-associate/',
  'LFCS': 'https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/',
  'LINUX+': 'https://www.comptia.org/certifications/linux',
  'LPIC-1': 'https://www.lpi.org/our-certifications/lpic-1-overview',
  'LPIC-2': 'https://www.lpi.org/our-certifications/lpic-2-overview',
  'LPIC-3': 'https://www.lpi.org/our-certifications/lpic-3-303-overview',
  'LPT': 'https://www.eccouncil.org/programs/licensed-penetration-tester-lpt-master/',
  'MAD CTI': 'https://mitre-engenuity.org/mad/',
  'MAD SOCA': 'https://mitre-engenuity.org/mad/',
  'MAD SOCAMAD CTI': 'https://mitre-engenuity.org/mad/',
  'MASE': 'https://www.mosse-institute.com/certifications/mase-certified-application-security-engineer.html',
  'MBT': 'https://www.mosse-institute.com/certifications/mbt-certified-blue-teamer.html',
  'MCD': 'https://www.mosse-institute.com/certifications/mcd-certified-code-deobfuscation-specialist.html',
  'MCL': 'https://www.mosse-institute.com/certifications/mcl-cybersecurity-leadership.html',
  'MCPE': 'https://www.mosse-institute.com/certifications/mcpe-certified-cyber-protection-expert.html',
  'MCPT': 'https://www.mosse-institute.com/certifications/mcpt-cloud-penetration-tester.html',
  'MCSE': 'https://www.mosse-institute.com/certifications/mcse-certified-cloud-security-engineer.html',
  'MCSF': 'https://www.mosse-institute.com/certifications/mcsf-cloud-services-fundamentals.html',
  'MDFIR': 'https://www.mosse-institute.com/certifications/mdfir-certified-dfir-specialist.html',
  'MDSO': 'https://www.mosse-institute.com/certifications/mdso-certified-devsecops-engineer.html',
  'MESE': 'https://www.mosse-institute.com/certifications/mese-certified-enterprise-security-engineer.html',
  'MGRC': 'https://www.mosse-institute.com/certifications/mgrc-certified-grc-practitioner.html',
  'MICS': 'https://www.mosse-institute.com/certifications/mics-introduction-to-cyber-security.html',
  'MNSE': 'https://www.mosse-institute.com/certifications/mnse-network-security-essentials.html',
  'MOIS': 'https://www.mosse-institute.com/certifications/mois-certified-osint-expert.html',
  'MPT': 'https://www.mosse-institute.com/certifications/mpt-certified-penetration-tester.html',
  'MRCI': 'https://www.mosse-institute.com/certifications/mrci-remote-cybersecurity-internship.html',
  'MRE': 'https://www.mosse-institute.com/certifications/mre-certified-reverse-engineer.html',
  'MRT': 'https://www.mosse-institute.com/certifications/mrt-certified-red-teamer.html',
  'MS-100': 'https://docs.microsoft.com/en-us/learn/certifications/m365-enterprise-administrator',
  'MSAF': 'https://www.mosse-institute.com/certifications/msaf-system-administration-fundamentals.html',
  'MTH': 'https://www.mosse-institute.com/certifications/mth-certified-threat-hunter.html',
  'MTIA': 'https://www.mosse-institute.com/certifications/mtia-certified-threat-intelligence-analyst.html',
  'MVRE': 'https://www.mosse-institute.com/certifications/mvre-vulnerability-researcher-and-exploitation-specialist.html',
  'M_O_R FDN': 'https://www.axelos.com/certifications/propath/mor-risk-management/mor-foundation',
  'M_O_R P': 'https://www.axelos.com/certifications/propath/mor-risk-management/mor-4-practitioner',
  'NCSC CCPLP': 'https://www.ncsc.gov.uk/information/about-certified-professional-scheme',
  'NCSC CCPP': 'https://www.ncsc.gov.uk/information/about-certified-professional-scheme',
  'NCSC CCPSP': 'https://www.ncsc.gov.uk/information/about-certified-professional-scheme',
  'NET+': 'https://www.comptia.org/certifications/network',
  'OPSA': 'https://www.isecom.org/certification.html',
  'OPSE': 'https://www.isecom.org/certification.html',
  'OPST': 'https://www.isecom.org/certification.html',
  'OSCE3': 'https://help.offensive-security.com/hc/en-us/articles/4403282452628-What-is-OSCE3-',
  'OSCP': 'https://www.offensive-security.com/pwk-oscp/',
  'OSDA': 'https://www.offensive-security.com/soc200-osda/',
  'OSED': 'https://www.offensive-security.com/exp301-osed/',
  'OSEE': 'https://www.offensive-security.com/awe-osee/',
  'OSEP': 'https://www.offensive-security.com/pen300-osep/',
  'OSIP': 'https://inteltechniques.com/training-osip.html',
  'OSMR': 'https://www.offensive-security.com/exp312-osmr/',
  'OSWA': 'https://www.offensive-security.com/web200-oswa/',
  'OSWE': 'https://www.offensive-security.com/awae-oswe/',
  'OSWP': 'https://www.offensive-security.com/wifu-oswp/',
  'OWSE': 'https://www.isecom.org/certification.html',
  'PACES': 'https://www.pentesteracademy.com/gcb',
  'PCCET': 'https://www.paloaltonetworks.com/services/education/certification',
  'PCDRA': 'https://www.paloaltonetworks.com/services/education/certification',
  'PCI QSA': 'https://www.pcisecuritystandards.org/assessors_and_solutions/become_qsa/',
  'PCNSA': 'https://www.paloaltonetworks.com/services/education/certification',
  'PCNSE': 'https://www.paloaltonetworks.com/services/education/certification#pcnse',
  'PCCSE': 'https://www.paloaltonetworks.com/services/education/certification',
  'PCSAE': 'https://www.paloaltonetworks.com/services/education/certification',
  'PCSAEPCCSE': 'https://www.paloaltonetworks.com/services/education/certification',
  'PDSO CDE': 'https://www.practical-devsecops.com/certified-devsecops-expert',
  'PDSO CDP': 'https://www.practical-devsecops.com/certified-devsecops-professional/',
  'PECB 27001F': 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-foundation',
  'PECB 27001LA': 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-lead-auditor',
  'PECB 27001LI': 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-lead-implementer',
  'PECB 27005F': 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-iec-27005-foundation',
  'PECB 27005LM': 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-27005-lead-risk-manager',
  'PECB 27005RM': 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-iec-27005-risk-manager',
  'PECB 27032CM': 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27032/iso-iec-27032-lead-cyber-security-manager',
  'PECB 27032F': 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27032/iso-iec-27032-foundation',
  'PENTEST+': 'https://www.comptia.org/certifications/pentest',
  'PEXIN ISM': 'https://www.exin.com/certifications/information-security-management-professional-based-isoiec-27001-exam',
  'PGMP': 'https://www.pmi.org/certifications/types/program-management-pgmp',
  'PJMR': 'https://certifications.tcm-sec.com/pjmr/',
  'PMI ACP': 'https://www.pmi.org/certifications/types/agile-acp',
  'PMP': 'https://www.pmi.org/certifications/project-management-pmp',
  'PNPT': 'https://certifications.tcm-sec.com/pnpt/',
  'PPM': 'https://gaqm.org/certifications/project_management/ppm',
  'PROGRAMMING LANGUAGE': 'https://www.learnpython.org/',
  'PROJECT+': 'https://www.comptia.org/certifications/project',
  'PSM I': 'https://www.scrum.org/assessments/professional-scrum-master-i-certification',
  'PSM II': 'https://www.scrum.org/assessments/professional-scrum-master-ii-certification',
  'PSM III': 'https://www.scrum.org/assessments/professional-scrum-master-iii-certification',
  'RHCA': 'https://www.redhat.com/en/services/certification/rhca',
  'RHCE': 'https://www.redhat.com/en/services/certification/rhce',
  'RHCSA': 'https://www.redhat.com/en/services/certification/rhcsa',
  'S-CEHL': 'https://www.seco-institute.org/certifications/ethical-hacking-track/leader/',
  'S-CISO': 'https://www.seco-institute.org/certifications/information-security-certification-track/',
  'S-CSPL': 'https://www.seco-institute.org/certifications/certified-secure-software-developer/',
  'S-EHE': 'https://www.seco-institute.org/certifications/ethical-hacking-certification-track/',
  'S-EHF': 'https://www.seco-institute.org/certifications/ethical-hacking-certification-track/ethical-hacking-foundation/',
  'S-ISF': 'https://www.seco-institute.org/certifications/information-security-certification-track/',
  'S-ISME': 'https://www.seco-institute.org/certifications/information-security-certification-track/',
  'S-ISP': 'https://www.seco-institute.org/certifications/information-security-certification-track/',
  'S-SA': 'https://www.seco-institute.org/get-trained/cyber-defense-track/associate-soc-analyst-certification/',
  'S-SPF': 'https://www.seco-institute.org/certifications/secure-software-certification-track/secure-programming-foundation/',
  'S-TA': 'https://www.seco-institute.org/get-trained/cyber-defense-track/threat-analyst-certification/',
  'SABSA SCF': 'https://sabsa.org/certification/',
  'SABSA SCM': 'https://sabsa.org/certification/',
  'SABSA SCP': 'https://sabsa.org/certification/',
  'SACP': 'https://www.thehlayer.com/about-exam/',
  'SC-100': 'https://docs.microsoft.com/en-us/certifications/exams/sc-100',
  'SC-200': 'https://docs.microsoft.com/en-us/learn/certifications/security-operations-analyst/',
  'SC-300': 'https://docs.microsoft.com/en-us/learn/certifications/identity-and-access-administrator/',
  'SC-400': 'https://docs.microsoft.com/en-us/learn/certifications/information-protection-administrator/',
  'SC-900': 'https://docs.microsoft.com/en-us/learn/certifications/security-compliance-and-identity-fundamentals/',
  'SCA': 'https://www.suse.com/training/exam/sca-sles-15/',
  'SCE': 'https://www.suse.com/training/exam/sce-sles-15/',
  'SCRUM PAL': 'https://www.scrum.org/professional-agile-leadership-certification',
  'SCRUM PSD': 'https://www.scrum.org/professional-scrum-developer-certification',
  'SCRUM SPS': 'https://www.scrum.org/scaled-professional-scrum-certification',
  'SECURITY+': 'https://www.comptia.org/certifications/security',
  'SERVER+': 'https://www.comptia.org/certifications/server',
  'SF CIAMD': 'https://trailhead.salesforce.com/help?article=Salesforce-Certified-Identity-and-Access-Management-Designer-Exam-Guide',
  'SFCCCC': 'https://trailhead.salesforce.com/help?article=Salesforce-Certified-Community-Cloud-Consultant-Exam-Guide',
  'SFCTA': 'https://trailhead.salesforce.com/help?article=Salesforce-Certified-Technical-Architect-Exam-Guide',
  'SFSA': 'https://trailhead.salesforce.com/credentials/systemarchitect',
  'SOG CAP': 'https://secops.group/product/certified-application-security-practitioner/',
  'SOG CAPEN': 'https://secops.group/product/certified-appsec-pentester/',
  'SOG CAPENX': 'https://secops.group/product/certified-appsec-pentesting-expert-capenx/',
  'SOG CCSP-AWS': 'https://secops.group/product/certified-cloud-security-practitioner-aws-ccsp-aws/',
  'SOG CMPEN AND': 'https://secops.group/product/certified-mobile-pentester-cmpen-android/',
  'SOG CMPEN IOS': 'https://secops.group/product/certified-mobile-pentester-cmpen-ios/',
  'SOG CNPEN': 'https://secops.group/product/certified-network-pentester/',
  'SOG NSP': 'https://secops.group/product/certified-network-security-practitioner/',
  'SPLK-3001': 'https://www.splunk.com/en_us/training/certification-track/splunk-es-certified-admin.html',
  'SSAP': 'https://www.sans.org/security-awareness-training/career-development/credential/',
  'SSCP': 'https://www.isc2.org/Certifications/SSCP',
  'TOGAF': 'https://www.opengroup.org/certifications/togaf',
  'TOGAF FDN': 'https://www.opengroup.org/certifications/togaf',
  'TUV AUDITOR': 'https://www.certipedia.com/quality_marks/0000063484?locale=en',
  'TUV COSM': 'https://limessecurity.com/en/academy/ics-211/',
  'TUV COSP': 'https://limessecurity.com/en/academy/ics-201/',
  'TUV COSTE': 'https://limessecurity.com/en/academy/ics-211/',
  'TUV COTCP': 'https://www.tuv.com/landingpage/en/lp-certified-operational-technology-cybersecurity-professional-program/',
  'TUV CYAWARE': 'https://www.is-its.org/seminare/isits-seminarangebot/cybersecurity-awareness-beauftragter',
  'TUV CYSEC': 'https://www.tuv.com/landingpage/en/training-functional-safety-cyber-security/detail-pages/zertifikate/cs-specialist.html',
  'TUV ITSM': 'https://www.certipedia.com/quality_marks/0000063483?locale=en',
  'TUV MSA': 'https://www.certipedia.com/quality_marks/0000046324?locale=en',
  'VCDX DCV': 'https://www.vmware.com/education-services/certification/vcdx-dcv.html',
  'VCIX DCV': 'https://www.vmware.com/education-services/certification/vcap-dcv-design.html',
  'VCIX NV': 'https://www.vmware.com/education-services/certification/vcap-nv-deploy.html',
  'VCP DCV': 'https://www.vmware.com/education-services/certification/vcp-dcv.html',
  'VCP NV': 'https://www.vmware.com/education-services/certification/vcp-nv-tracks.html',
  'WCNA': 'https://www.wcnacertification.com/exam-information-1',
  'ZACH EAA': 'https://www.zachman.com/certification/what-we-certify/enterprise-architect',
  'ZACH EAP': 'https://www.zachman.com/certification/what-we-certify/enterprise-architect',
  'ZACH EAPRO': 'https://www.zachman.com/certification/what-we-certify/enterprise-architect',
};

// Global Variables
let certDatabase = [];

// Raw data strings from roadmap.html (combined top-expert & expert into expert)
const rawTopExpert = `OSEE, CCIE Sec, CREST CRTSA, ITIL Master, OSCE3, CCIE Ent, VCDX DCV, RHCA, SABSA SCM, GSE, GREM, OSWE, OSEP, OSED, PgMP, CISSP Concentrations, NCSC CCPLP, CFCE, GXPN`;

const rawExpert = `VCIX DCV, ASIS CPP, Zach EAPro, PMP, CISM, S-ISME, NCSC CCPSP, CSFA, GIME, GAWN, CISSP, CCD, CAWFE, GCFA, GCTI, CREST CSAM, JNCIE Sec, CCDE, AWS SAP, RHCE, GDAT, SC-100, TOGAF, CCISO, EEXIN ISM, GSTRT, NCSC CCPP, GSNA, CFSR, GNFA, eWPTX, CREST CCSAS, FCX, AZ-305, VCIX NV, LPIC-3, SABSA SCP, PSM III, GSP, GISP, MTIA, GCFR, BTL2, MRT, CREST CCTINF, HTB CWEE, Google PCSA, SCE, ISA CE, GDSA, ITIL SL, Zach EAP, GSLC, S-CISO, GCFE, GEIR, PACES, S-CEHL, CREST CRT, CRTO II, MCD, CCNP Sec, CIMP, CASP+, GASF, eCTHP, S-EHE, JNCIP Sec, PCNSE, FCSS ZTA, FCSS SASE, FCSS PCS, GCTD, CACE, ITIL MP, Scrum SPS, GLEG, CISSM, CGRC, CRISC, GCCC, PCI QSA, GWEB, Cisco COP, CCFE, GCED, MCPE, CREST CCTIM, OSCP, F5 CSE Sec, CCNP Ent, MS-100, GPCS, GCSA, GCWN, GRID, CIS LI, CIPT, CDPSE, CSM, CASM, CM)ISSO, S-ISP, CISA, GMON, CIS LA, S-CSPL, GCDA, CMFE, GX-FA, GCIH, GX-PT, GPEN, OSWP, CRTO, CCSM, PCSAE, PCCSE, CIAM, FCSS SO, PDSO CDE, VCP DCV, CKS, LFCS, FCSS OT, CSSA, Scrum PSD, GCPM, BCS PCIRM, PEXIN ISM, MGRC, CSSLP, MTH, CDRP, eCDFP, GPYC, MDFIR, LPT, PNPT, GCPN, GRTP, SOG CAPenX, GMOB, FCSS NS, CIDPRO, CCSP, FCP PCS, FCP SO, RHCSA, ISA CDS, SFCTA, EPDPP, M_o_R P, CPD, PMI ACP, EISM, CGEIT, EXIN 27001E, PECB 27005LM, DCCRP, GCIA, CTPRA, PECB 27001LA, DevNet Pro, SC-400, CCE, CM)DFI, CREST CRIA, CREST CRTIA, GWAPT, OSMR, GCPT, CCPenX-AWS, CCSE, AWS CSS, SFCCCC, EXIN PCSA, CKA, TUV COTCP, SABSA SCF, CIPA, DCPP, Scrum PAL, CAPM, PSM II, APMG 20000P, C)ISRM, APMG 27001P, PECB 27001LI, IS20, C)ISSA, APMG 27001A, CASE, C)DRE, GSOC, GBFA, BTL1, MBT, MPT, CPENT, CREST CCTAPP, HTB CPTS, MRE, JNCIS Sec, Programming Language, GMLE, CREST CCHIA, EnCE, ACE, eCIR, C)IHE, CSTL, eCPPT, eWPT, CM)IPS, HTB CBBH, PJMR`;

const rawIntermediate = `F5 CTS APM, FCP NS, CCNA, AZ-500, CSA CGC, VCP NV, CKAD, LPIC-2, GCIP, CDP, CCP, C)ISSO, CIS RM, EXIN 27001P, PECB 27032CM, C)HISSP, APMG 20000A, C)ISMS-LA, CIS IA, CASST, OSIP, Cisco COA, C)CSA, CHFI, S-TA, ECIH, C)PSH, CMWAPT, C)PTC, CRTOP, CSR, F5 CTS DNS, PCDRA, SF CIAMD, GCLD, AWS SAA, EXIN PCSerM, ISA CRAS, SPLK-3001, BCS PCIAA, CCSA, PPM, C)ISSM, TUV ITSM, CCRMP, PECB 27005RM, CSBA, DCBCLA, TUV MSA, DevNet A, CySA+, CSX-P, C)NFE, GOSI, C)TIA, OSDA, eMAPT, BSCP, OPST, OSWA, CREA, CWSP, CREST CCNIA, CIGE, AZ-104, CLCSM, MCSE, SFSA, ASIS APP, CNDA, DACRP, CISRM, DCRMP, SSAP, GRCP, SACP, CISP, TUV Auditor, CTPRP, IIA CIA, CCSC, SC-200, MRCI, EDRP, HTB CDSA, CFR, CTIA, CSTM, eJPT, S-EHP, CHAT, CREST CPSA, F5 CA, eNDP, CIST, Google PCSE, EXIN PCSM, MDSO, SCA, ISA CAP, TUV COSM, Zach EAA, CAD, CAC, ISMI CSMP, CSCS, APMG 27001F, PECB 27001F, C)SLO, DCBCA, GRCA, CISST, C)SWAE, OPSA, CSAE, ASIS PCI, MAD SOCA, MAD CTI, CEH, SOG CAPen, C)PTE, SOG CNPen, DV RTOS, DV OTD, MVRE, MNSE, PCNSA, OWSE, SC-300, CSA CCSK, C)CSO, DCA, LPIC-1, GICSP, GSEC, MOIS, CFA, CSA, GFACT, SOG CMPen And, SOG CMPen iOS, DV MoS, Pentest+, CREST CSAS, ECES, JNCIA Sec, FCA, WCNA, Server+, PDSO CDP, EXIN PCD, KCNA, Linux+`;

const rawBeginner = `AZ-220, CRFS, SSCP, SOG CAP, CCOA, CREST CPIA, MESE, CREST CPTIA, MCPT, C)PEH, GCPEH, ITS-NS, CCT, Cloud+, Google ACE, SOG CCSP-AWS, LFCA, ISA CFS, EITCA/IS, CIPP, Security+, ECSS, C)DFE, S-SA, DV AOPH, SOG NSP, Net+, CAMS, AZ-900, MCSF, MSAF, Apple ACSP, CACS, TUV COSTE, EPDPF, TOGAF Fdn, CSP, IIBA CCA, CITGP, C)ISCAP, CSAP, PECB 27032F, MCL, ITS-C, EXIN CIT, TUV CySec, CSST, OPSE, CSX-F, DV MILF, CIRM Fdn, EEHF, S-EHF, CHA, FCF, PCCET, AWS CP, EXIN PCA, A+, CIOTSP, TUV COSP, EPDPE, M_o_R Fdn, Fair Fdn, PSM I, APMG 20000F, ISMI CSM, BCS FISMP, CC, S-ISF, GISF, TUV CyAware, MASE, C)SP, CND, C)VA, KLCP, SC-900, Cloud Essnt, ITIL Fdn, Project+, CIISec ICSF, FEXIN, EXIN 27001F, PECB 27005F, C CS F, CIS F, S-SPF, CSCU, MICS`;

// 15 Standard Domains Map
const domainMap = {
  "Communication and Network Security": "Communication & Network Security",
  "IAM": "Identity & Access Management (IAM)",
  "Security Architecture and Engineering": "Security Architecture & Engineering",
  "Asset Security": "Asset Security",
  "Security and Risk Management": "Security & Risk Management",
  "Security Assessment and Testing": "Security Assessment & Testing",
  "Software Security": "Software Security",
  "Security Operations": "Security Operations (SOC / Blue Team)",
  "Cloud/SysOps": "Cloud & SysOps Security",
  "*nix": "Linux / Unix Security",
  "ICS/IoT": "ICS / OT / IoT Security",
  "GRC": "Governance, Risk & Compliance (GRC)",
  "Forensics": "Digital Forensics",
  "Incident Handling": "Incident Handling & Response",
  "Penetration Testing": "Penetration Testing & Red Team",
  "Exploitation": "Penetration Testing & Red Team"
};

// Domain Details (Summaries & Colors)
const domainsMetadata = {
  "Communication & Network Security": {
    desc: "Borders, firewalls, routing protocols, and secure network infrastructure design.",
    color: "#00f0ff", // Neon Cyan
    filename: "roadmap-communication-security.html",
    vendors: ["Cisco", "CompTIA", "Fortinet", "Juniper", "GIAC", "Palo Alto", "Check Point"]
  },
  "Identity & Access Management (IAM)": {
    desc: "User authentication, directory services, access control design, and identity lifecycles.",
    color: "#ffaa00", // Neon Amber
    filename: "roadmap-iam.html",
    vendors: ["Microsoft", "ISACA", "ISC2", "Other"]
  },
  "Security Architecture & Engineering": {
    desc: "System defense design, cryptographic protocols, trust models, and secure systems engineering.",
    color: "#ffdd00", // Yellow Gold
    filename: "roadmap-architecture-engineering.html",
    vendors: ["SABSA", "VMware", "ISC2", "Other"]
  },
  "Asset Security": {
    desc: "Data governance, classification, information lifecycle management, and privacy protections.",
    color: "#00d2c4", // Turquoise
    filename: "roadmap-asset-security.html",
    vendors: ["ISC2", "ISACA", "ISO/IEC", "Other"]
  },
  "Security & Risk Management": {
    desc: "Risk assessments, governance policies, compliance models, and training strategies.",
    color: "#ff5b94", // Neon Coral Pink
    filename: "roadmap-risk-management.html",
    vendors: ["ISC2", "ISACA", "GIAC", "Other"]
  },
  "Security Assessment & Testing": {
    desc: "Vulnerability analysis, security audits, penetration testing validation, and testing methods.",
    color: "#a020f0", // Violet
    filename: "roadmap-assessment-testing.html",
    vendors: ["CompTIA", "GIAC", "EC-Council", "Other"]
  },
  "Software Security": {
    desc: "Secure software development lifecycle (SSDLC), code audits, and secure coding practices.",
    color: "#00ff66", // Neon Green
    filename: "roadmap-software-security.html",
    vendors: ["ISC2", "GIAC", "Other"]
  },
  "Security Operations (SOC / Blue Team)": {
    desc: "Incident detection, logs monitoring, defense operations, and security administration.",
    color: "#ff3c00", // Orange Red
    filename: "roadmap-security-operations.html",
    vendors: ["Security Blue Team", "CompTIA", "GIAC", "Other"]
  },
  "Cloud & SysOps Security": {
    desc: "Cloud platform hardening, virtualization security, microservices, and containerization.",
    color: "#00a2ff", // Neon Blue
    filename: "roadmap-cloud-security.html",
    vendors: ["AWS", "Microsoft", "Google", "ISC2", "Other"]
  },
  "Linux / Unix Security": {
    desc: "*nix kernel hardening, system administration, and shell scripting security.",
    color: "#ff3333", // Red
    filename: "roadmap-linux-security.html",
    vendors: ["Red Hat", "CompTIA", "Other"]
  },
  "ICS / OT / IoT Security": {
    desc: "Industrial control systems, SCADA systems, smart device security, and critical infrastructure.",
    color: "#b5ff00", // Neon Lime Green
    filename: "roadmap-ics-iot.html",
    vendors: ["GIAC", "Other"]
  },
  "Governance, Risk & Compliance (GRC)": {
    desc: "Regulatory compliance, industry frameworks (ISO, NIST), auditing, and security governance.",
    color: "#38b000", // Emerald Green
    filename: "roadmap-grc.html",
    vendors: ["ISACA", "ISO/IEC", "PECB", "Other"]
  },
  "Digital Forensics": {
    desc: "Evidence collection, malware analysis, disk forensics, and post-breach investigation.",
    color: "#e0aaff", // Lavender Glow
    filename: "roadmap-forensics.html",
    vendors: ["EC-Council", "GIAC", "Other"]
  },
  "Incident Handling & Response": {
    desc: "Response lifecycle, threat hunting, containment, and incident recovery strategies.",
    color: "#ff007f", // Neon Deep Pink
    filename: "roadmap-incident-response.html",
    vendors: ["EC-Council", "GIAC", "Other"]
  },
  "Penetration Testing & Red Team": {
    desc: "Offensive exploitation, red team simulations, vulnerability scanning, and ethical hacking.",
    color: "#cc00ff", // Neon Purple
    filename: "roadmap-penetration-testing.html",
    vendors: ["OffSec", "eLearnSecurity", "TCM Security", "Hack The Box", "CompTIA", "GIAC", "Other"]
  }
};

// Global coordinates for vendor headquarters
const vendorHQs = {
  "AWS": { lat: 47.6062, lon: -122.3321, label: "AWS Security", desc: "Seattle, WA - Cloud Security Hub" },
  "Microsoft": { lat: 47.6740, lon: -122.1215, label: "Microsoft Security", desc: "Redmond, WA - Enterprise Identity & Azure Hub" },
  "Google": { lat: 37.4220, lon: -122.0841, label: "Google Cloud Security", desc: "Mountain View, CA - Google Cloud Platform" },
  "Cisco": { lat: 37.3382, lon: -121.8863, label: "Cisco Systems", desc: "San Jose, CA - Communication & NetSec HQ" },
  "Juniper": { lat: 37.4037, lon: -122.0292, label: "Juniper Networks", desc: "Sunnyvale, CA - Enterprise Routing & Sec" },
  "Fortinet": { lat: 37.3688, lon: -122.0363, label: "Fortinet", desc: "Sunnyvale, CA - NextGen Firewall & NetSec" },
  "Palo Alto": { lat: 37.3541, lon: -121.9552, label: "Palo Alto Networks", desc: "Santa Clara, CA - Cloud & Firewall Command" },
  "GIAC": { lat: 38.9847, lon: -77.0947, label: "GIAC / SANS", desc: "Bethesda, MD - SANS Training & GIAC Certs" },
  "eLearnSecurity": { lat: 35.7915, lon: -78.7811, label: "eLearnSecurity / INE", desc: "Cary, NC - Practical Cyber Training Hub" },
  "OffSec": { lat: 40.7128, lon: -74.0060, label: "OffSec", desc: "New York, NY - OSCP & Offensive Operations HQ" },
  "CompTIA": { lat: 41.8089, lon: -88.0111, label: "CompTIA", desc: "Downers Grove, IL - Foundational Security HQ" },
  "ISC2": { lat: 27.9659, lon: -82.8001, label: "(ISC)²", desc: "Clearwater, FL - CISSP & Cyber Governance HQ" },
  "ISACA": { lat: 42.0334, lon: -88.0834, label: "ISACA", desc: "Schaumburg, IL - Audit, Risk & GRC Certification HQ" },
  "Hack The Box": { lat: 51.2787, lon: 0.5217, label: "Hack The Box", desc: "Kent, UK - Interactive Pentest Labs HQ" },
  "CREST": { lat: 51.5074, lon: -0.1278, label: "CREST Council", desc: "London, UK - Penetration Testing Standards" },
  "EC-Council": { lat: 35.0844, lon: -106.6504, label: "EC-Council", desc: "Albuquerque, NM - CEH & CHFI Training HQ" },
  "Security Blue Team": { lat: 52.4862, lon: -1.8904, label: "Security Blue Team", desc: "Birmingham, UK - Defensive Operations HQ" },
  "TCM Security": { lat: 35.2271, lon: -80.8431, label: "TCM Security", desc: "Charlotte, NC - PNPT & Practical NetSec HQ" },
  "Red Hat": { lat: 35.7796, lon: -78.6382, label: "Red Hat", desc: "Raleigh, NC - Linux Admin & System Hardening HQ" },
  "VMware": { lat: 37.4025, lon: -122.1384, label: "VMware", desc: "Palo Alto, CA - Virtualization Architecture HQ" },
  "Axelos (ITIL)": { lat: 51.5074, lon: -0.1278, label: "Axelos ITIL", desc: "London, UK - IT Service Governance" },
  "SABSA": { lat: 51.5074, lon: -0.1278, label: "SABSA Institute", desc: "London, UK - Architecture Framework HQ" },
  "ISO/IEC": { lat: 46.2044, lon: 6.1432, label: "ISO Secretariat", desc: "Geneva, Switzerland - International Standards" },
  "PECB": { lat: 45.5017, lon: -73.5673, label: "PECB Group", desc: "Montreal, Canada - ISO Audit & Compliance" },
  "Other": { lat: 13.0827, lon: 80.2707, label: "Specialty Labs", desc: "Chennai, India - Custom Validation Nodes" }
};

// Database of specific certification descriptions
const certInfoDb = {
  // Beginner
  "SECURITY+": { fullName: "CompTIA Security+", issuer: "CompTIA", examFormat: "Multiple Choice & Performance-based", estPrep: "1 - 2 months", description: "Foundational cybersecurity certification covering core security principles, risk management, threat analysis, and hands-on security troubleshooting." },
  "NET+": { fullName: "CompTIA Network+", issuer: "CompTIA", examFormat: "Multiple Choice & Performance-based", estPrep: "1 - 2 months", description: "Covers network technologies, installation and configuration, media and topologies, management, and security." },
  "A+": { fullName: "CompTIA A+", issuer: "CompTIA", examFormat: "Multiple Choice & Performance-based", estPrep: "2 - 3 months", description: "The industry standard for establishing a career in IT, covering hardware, operating systems, cloud, and troubleshooting." },
  "AWS CP": { fullName: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", examFormat: "Multiple Choice", estPrep: "2 - 4 weeks", description: "Validates overall understanding of the AWS Cloud platform, covering basic services, architecture, security, and pricing." },
  "AZ-900": { fullName: "Microsoft Certified: Azure Fundamentals", issuer: "Microsoft", examFormat: "Multiple Choice", estPrep: "2 - 4 weeks", description: "Provides foundational knowledge of Azure cloud services, security, privacy, compliance, and basic pricing models." },
  "SC-900": { fullName: "Microsoft Certified: Security, Compliance, and Identity Fundamentals", issuer: "Microsoft", examFormat: "Multiple Choice", estPrep: "2 - 4 weeks", description: "Covers the fundamentals of security, compliance, and identity across Microsoft cloud and related services." },
  "CC": { fullName: "Certified in Cybersecurity", issuer: "(ISC)²", examFormat: "Multiple Choice", estPrep: "1 month", description: "Foundational entry-level security credential covering security principles, business continuity, access controls, and network security." },
  "LINUX+": { fullName: "CompTIA Linux+", issuer: "CompTIA", examFormat: "Multiple Choice & Performance-based", estPrep: "1 - 2 months", description: "Validates the competencies required of an early-career system administrator supporting Linux systems." },

  // Intermediate
  "CEH": { fullName: "Certified Ethical Hacker", issuer: "EC-Council", examFormat: "Multiple Choice (Practical optional)", estPrep: "2 - 3 months", description: "Teaches hacking methodologies, scanning networks, system hacking, malware analysis, and social engineering." },
  "CCNA": { fullName: "Cisco Certified Network Associate", issuer: "Cisco", examFormat: "Multiple Choice & Simulation", estPrep: "2 - 3 months", description: "Covers network fundamentals, IP connectivity, IP services, security fundamentals, automation, and programmability." },
  "CYSA+": { fullName: "CompTIA CySA+ (Cybersecurity Analyst)", issuer: "CompTIA", examFormat: "Multiple Choice & Performance-based", estPrep: "2 - 3 months", description: "Applies behavioral analytics to networks and devices to prevent, detect, and combat cybersecurity threats." },
  "PENTEST+": { fullName: "CompTIA PenTest+", issuer: "CompTIA", examFormat: "Multiple Choice & Performance-based", estPrep: "2 - 3 months", description: "Focuses on hands-on penetration testing skills, vulnerability assessment, and managing test engagements." },
  "EJPT": { fullName: "eLearnSecurity Junior Penetration Tester", issuer: "INE (eLearnSecurity)", examFormat: "100% Practical Hands-on Exam", estPrep: "1 - 2 months", description: "A highly respected practical certification mapping network security, system assessment, web app pentesting, and routing." },
  "AZ-500": { fullName: "Microsoft Certified: Azure Security Engineer", issuer: "Microsoft", examFormat: "Multiple Choice & Lab", estPrep: "2 - 3 months", description: "Covers implementing security controls and threat protection, managing identity and access, and securing data/apps/networks." },
  "CSA CCSK": { fullName: "Certificate of Cloud Security Knowledge", issuer: "Cloud Security Alliance", examFormat: "Multiple Choice", estPrep: "1 month", description: "Widely recognized benchmark for cloud security expertise, addressing critical governance and architectural guidance." },

  // Expert
  "OSCP": { fullName: "Offensive Security Certified Professional", issuer: "Offensive Security (OffSec)", examFormat: "24-Hour Practical Lab Exam", estPrep: "3 - 6 months", description: "The gold standard for penetration testing, requiring students to exploit multiple targets and submit a professional report." },
  "CISSP": { fullName: "Certified Information Systems Security Professional", issuer: "(ISC)²", examFormat: "Adaptive Multiple Choice", estPrep: "3 - 6 months", description: "The premier cybersecurity management credential, validating broad engineering, architecture, operations, and governance expertise." },
  "CISM": { fullName: "Certified Information Security Manager", issuer: "ISACA", examFormat: "Multiple Choice", estPrep: "2 - 4 months", description: "Focuses on information security management, governance, program development, incident response, and risk management." },
  "CISA": { fullName: "Certified Information Systems Auditor", issuer: "ISACA", examFormat: "Multiple Choice", estPrep: "2 - 4 months", description: "The industry standard for security auditing, control assessment, governance, and business systems management." },
  "PNPT": { fullName: "Practical Network Penetration Tester", issuer: "TCM Security", examFormat: "5-Day Practical Exam + Peer Review", estPrep: "2 - 4 months", description: "A rigorous network penetration test simulating real-world engagements, including external/internal networks, OSINT, and active directory." },
  "EWPT": { fullName: "eLearnSecurity Web Application Penetration Tester", issuer: "INE (eLearnSecurity)", examFormat: "Practical Web Exploit Lab", estPrep: "2 - 3 months", description: "Validates deep technical skills in assessment, penetration testing, and exploitation of complex web applications." },
  "BTL1": { fullName: "Blue Team Level 1", issuer: "Security Blue Team", examFormat: "24-Hour Practical Incident Lab", estPrep: "2 - 3 months", description: "A practical operations credential covering security monitoring, traffic analysis, digital forensics, and incident response." },
  "CCNP SEC": { fullName: "Cisco Certified Network Professional Security", issuer: "Cisco", examFormat: "Core exam + Concentration exam", estPrep: "3 - 6 months", description: "Validates expert enterprise security administration, firewalls, secure access controls, and network automation." },
  "CREST CRT": { fullName: "CREST Registered Penetration Tester", issuer: "CREST", examFormat: "Written & Practical Exploitation", estPrep: "3 - 6 months", description: "Core industry certification indicating professional proficiency in core penetration testing and vulnerability auditing." },
  "OSEE": { fullName: "Offensive Security Exploitation Expert", issuer: "Offensive Security (OffSec)", examFormat: "72-Hour Practical Exploit Dev Lab", estPrep: "6 - 12 months", description: "The highest-level exploit development credential, testing advanced windows kernel exploitation, browser exploits, and bypasses." },
  "OSCE3": { fullName: "Offensive Security Certified Expert 3", issuer: "Offensive Security (OffSec)", examFormat: "Combined credential (OSWP + OSED + OSEP + OSMR)", estPrep: "12 - 24 months", description: "Achieved by completing OffSec's three advanced certifications (Penetration Testing, Exploit Development, macOS Research)." },
  "GSE": { fullName: "GIAC Security Expert", issuer: "GIAC (SANS)", examFormat: "Hands-on Practical & Written Exams", estPrep: "6 - 12 months", description: "The absolute peak credential from SANS/GIAC, demonstrating broad and deep mastery of active defense, threat response, and forensics." },
  "GREM": { fullName: "GIAC Reverse Engineering Malware", issuer: "GIAC (SANS)", examFormat: "Multiple Choice & Scenario Lab", estPrep: "3 - 6 months", description: "Expert reverse-engineering certification for analyzing malicious software, understanding its functionality, and writing signatures." },
  "OSWE": { fullName: "Offensive Security Web Expert", issuer: "Offensive Security (OffSec)", examFormat: "48-Hour Practical Web Exploit", estPrep: "3 - 6 months", description: "Advanced web application exploitation focusing on white-box source code auditing, custom exploit scripting, and chaining vulnerabilities." },
  "OSEP": { fullName: "Offensive Security Experienced Penetration Tester", issuer: "Offensive Security (OffSec)", examFormat: "48-Hour Enterprise Active Directory Lab", estPrep: "3 - 6 months", description: "Advanced red teaming and evasion credential focusing on exploiting Active Directory, bypassing AV/EDR controls, and lateral movement." },
  "OSED": { fullName: "Offensive Security Exploit Developer", issuer: "Offensive Security (OffSec)", examFormat: "48-Hour Exploit Creation Lab", estPrep: "3 - 6 months", description: "Teaches x86 assembly, reverse engineering, buffer overflows, format string bugs, and writing custom shellcode to bypass DEP and ASLR." },
  "CCIE SEC": { fullName: "Cisco Certified Internetwork Expert Security", issuer: "Cisco", examFormat: "8-Hour Hands-on Lab Exam", estPrep: "6 - 12 months", description: "Cisco's flagship security credential, verifying expert network engineering, infrastructure design, firewalls, and security policies." },
  "CREST CRTSA": { fullName: "CREST Registered Technical Security Architecture", issuer: "CREST", examFormat: "Written & Practical Core Analysis", estPrep: "6 - 12 months", description: "Advanced certification evaluating expert capability in technical security architecture review, designs, and threat modeling." }
};

// Smart domain resolver
function getDomainForCert(name) {
  const n = name.toUpperCase().trim();

  if (n.includes("NET") || n.includes("CCNA") || n.includes("CCIE") || n.includes("CCNP") || n.includes("COA") || n.includes("ROUT") || n.includes("SWITCH") || n.includes("F5") || n.includes("JNCIA") || n.includes("JNCIS") || n.includes("JNCIP") || n.includes("JNCIE") || n.includes("WCNA"))
    return "Communication and Network Security";

  if (n.includes("IAM") || n.includes("IDENT") || n.includes("OKTA") || n.includes("ACCESS") || n.includes("CIAM") || n.includes("CIDPRO") || n.includes("DCPP") || n.includes("CIPA") || n.includes("EPDP"))
    return "IAM";

  if (n.includes("ARCH") || n.includes("TOGAF") || n.includes("SABSA") || n.includes("VCDX") || n.includes("GDSA") || n.includes("ZEA") || n.includes("CCDE") || n.includes("SC-100") || n.includes("CSSA"))
    return "Security Architecture and Engineering";

  if (n.includes("CLOUD") || n.includes("AWS") || n.includes("AZ-") || n.includes("AZURE") || n.includes("GCP") || n.includes("GOOGLE") || n.includes("DOCKER") || n.includes("KUBER") || n.includes("CKA") || n.includes("CKAD") || n.includes("KCNA") || n.includes("VCIX") || n.includes("VCP") || n.includes("LFCA") || n.includes("GPCS") || n.includes("GCSA"))
    return "Cloud/SysOps";

  if (n.includes("LINUX") || n.includes("REDHAT") || n.includes("RHCS") || n.includes("RHCE") || n.includes("LPIC") || n.includes("UNIX") || n.includes("RHCA") || n.includes("LFCS") || n.includes("*NIX"))
    return "*nix";

  if (n.includes("GRC") || n.includes("CISM") || n.includes("CISA") || n.includes("AUDIT") || n.includes("ISO") || n.includes("27001") || n.includes("27005") || n.includes("COMPLI") || n.includes("LAW") || n.includes("LEGAL") || n.includes("ITIL") || n.includes("PMP") || n.includes("RISK") || n.includes("CRISC") || n.includes("COBIT") || n.includes("CGEIT") || n.includes("SCRUM") || n.includes("PSM") || n.includes("CAPM") || n.includes("PMI") || n.includes("PRINCE2") || n.includes("GRCP") || n.includes("GRCA"))
    return "GRC";

  if (n.includes("FOREN") || n.includes("CHFI") || n.includes("GCFA") || n.includes("GCFE") || n.includes("GASF") || n.includes("CFCE") || n.includes("DFIR") || n.includes("CFSR") || n.includes("GNFA") || n.includes("GCFR") || n.includes("ENCE"))
    return "Forensics";

  if (n.includes("INCID") || n.includes("HANDL") || n.includes("GCIH") || n.includes("ECIH") || n.includes("SOAR") || n.includes("SIEM") || n.includes("SOC") || n.includes("MONIT") || n.includes("BTL") || n.includes("CRT") || n.includes("GMON") || n.includes("GCDA"))
    return "Incident Handling";

  if (n.includes("PEN") || n.includes("OSCP") || n.includes("GPEN") || n.includes("WPT") || n.includes("CEH") || n.includes("TEST") || n.includes("HACK") || n.includes("BURP") || n.includes("SEC+") || n.includes("SECURITY+") || n.includes("CYSA") || n.includes("C NDA") || n.includes("GWAPT") || n.includes("PNPT") || n.includes("CPTS") || n.includes("CBBH"))
    return "Penetration Testing";

  if (n.includes("EXPLOIT") || n.includes("OSCE") || n.includes("OSEE") || n.includes("OSED") || n.includes("OSEP") || n.includes("GXPN") || n.includes("OSMR") || n.includes("GREM") || n.includes("CRTO") || n.includes("PACES"))
    return "Exploitation";

  if (n.includes("ICS") || n.includes("IOT") || n.includes("SCADA") || n.includes("ISA") || n.includes("GRID") || n.includes("GICSP"))
    return "ICS/IoT";

  if (n.includes("SOFT") || n.includes("DEV") || n.includes("CODE") || n.includes("CSSLP") || n.includes("PROGRAM") || n.includes("JAVA") || n.includes("PYTHON") || n.includes("GPYC") || n.includes("GMLE"))
    return "Software Security";

  // Fallback balancer using character checksums
  const domains = Object.keys(domainMap);
  let sum = 0;
  for (let i = 0; i < n.length; i++) sum += n.charCodeAt(i);
  return domains[sum % domains.length];
}

// Map certification issuer vendor
function getVendorForCert(name) {
  const n = name.toUpperCase().trim();
  if (n.startsWith("AWS") || n === "AWS CP" || n === "AWS SAA" || n === "AWS SAP") return "AWS";
  if (n.startsWith("AZ-") || n.startsWith("SC-") || n.startsWith("MS-") || n.includes("AZURE") || n.includes("MICROSOFT")) return "Microsoft";
  if (n.startsWith("CCNA") || n.startsWith("CCNP") || n.startsWith("CCIE") || n.startsWith("CCT") || n.includes("CISCO")) return "Cisco";
  if (n.startsWith("JNCIA") || n.startsWith("JNCIS") || n.startsWith("JNCIP") || n.startsWith("JNCIE") || n.includes("JUNIPER")) return "Juniper";
  if (n.startsWith("FCA") || n.startsWith("FCP") || n.startsWith("FCSS") || n.startsWith("FCX") || n.includes("FORTINET")) return "Fortinet";
  if (n.startsWith("PCN") || n.startsWith("PCC") || n.includes("PALO ALTO")) return "Palo Alto";
  if (n.startsWith("G") && (n.length <= 5 || n.startsWith("GSEC") || n.startsWith("GCIA") || n.startsWith("GCIH") || n.startsWith("GCFA") || n.startsWith("GXPN") || n.startsWith("GREM") || n.startsWith("GISF") || n.startsWith("GDSA") || n.startsWith("GPEN") || n.startsWith("GWAPT") || n.startsWith("GCFE") || n.startsWith("GNFA") || n.startsWith("GICSP") || n.startsWith("GCDA") || n.startsWith("GOSI") || n.startsWith("GASF") || n.startsWith("GCTD") || n.startsWith("GSTRT") || n.startsWith("GSLC") || n.startsWith("GSSP") || n.startsWith("GWEB") || n.startsWith("GRID") || n.startsWith("GMOB") || n.startsWith("GCPM") || n.startsWith("GPYC") || n.startsWith("GMLE"))) return "GIAC";
  if (n.startsWith("EJPT") || n.startsWith("ECPPT") || n.startsWith("EWPT") || n.startsWith("ECIR") || n.startsWith("EMAPT") || n.startsWith("ENDP") || n.startsWith("ECTHP") || n.startsWith("ECDFP")) return "eLearnSecurity";
  if (n.startsWith("OSCP") || n.startsWith("OSEP") || n.startsWith("OSWE") || n.startsWith("OSED") || n.startsWith("OSCE") || n.startsWith("OSEE") || n.startsWith("OSWP") || n.startsWith("OSMR") || n.startsWith("OSIP") || n.startsWith("OSDA") || n.startsWith("OSWA")) return "OffSec";
  if (n.includes("SECURITY+") || n.includes("NETWORK+") || n.includes("A+") || n.includes("LINUX+") || n.includes("PENTEST+") || n.includes("CYSA+") || n.includes("CASP+") || n.includes("SERVER+") || n.includes("PROJECT+") || n.includes("CLOUD+") || n === "NET+" || n === "SEC+") return "CompTIA";
  if (n.includes("CISSP") || n.includes("CCSP") || n.includes("CSSLP") || n.includes("SSCP") || n === "CC") return "ISC2";
  if (n.includes("CISM") || n.includes("CISA") || n.includes("CRISC") || n.includes("CGEIT") || n.includes("CDPSE") || n.includes("CSX")) return "ISACA";
  if (n.startsWith("HTB")) return "Hack The Box";
  if (n.startsWith("CREST")) return "CREST";
  if (n.startsWith("CEH") || n.startsWith("CHFI") || n.startsWith("ECIH") || n.startsWith("CSA") || n.startsWith("CFR") || n.startsWith("ECES") || n.startsWith("EISM") || n.startsWith("EDRP") || n.startsWith("CPENT") || n.startsWith("LPT")) return "EC-Council";
  if (n.startsWith("BTL") || n.startsWith("BLUE TEAM")) return "Security Blue Team";
  if (n.startsWith("PNPT") || n.startsWith("PJMR") || n.startsWith("PACES")) return "TCM Security";
  if (n.startsWith("RHCSA") || n.startsWith("RHCE") || n.startsWith("RHCA")) return "Red Hat";
  if (n.startsWith("VCP") || n.startsWith("VCIX") || n.startsWith("VCDX")) return "VMware";
  if (n.startsWith("ITIL")) return "Axelos (ITIL)";
  if (n.startsWith("TOGAF")) return "The Open Group";
  if (n.startsWith("SABSA")) return "SABSA";
  if (n.startsWith("ISO") || n.includes("27001") || n.includes("27005")) return "ISO/IEC";
  if (n.startsWith("PECB")) return "PECB";
  if (n.startsWith("EXIN")) return "EXIN";
  if (n.startsWith("TUV")) return "TÜV";
  return "Other";
}

// Build global certification database
function buildCertDatabase() {
  const db = [];
  const seen = new Set();

  const addCerts = (rawStr, rawLevel) => {
    rawStr.split(',').forEach(item => {
      const name = item.trim();
      if (name && !seen.has(name.toUpperCase())) {
        seen.add(name.toUpperCase());
        const originalDomain = getDomainForCert(name);
        const standardDomain = domainMap[originalDomain] || "Other Specialty Labs";
        
        // Map 4 levels to 3: beginner->beginner, intermediate->intermediate, expert & top-expert->expert
        let level = 'expert';
        if (rawLevel === 'beginner') level = 'beginner';
        else if (rawLevel === 'intermediate') level = 'intermediate';

        const vendor = getVendorForCert(name);

        db.push({
          name,
          level,
          domain: standardDomain,
          vendor
        });
      }
    });
  };

  addCerts(rawTopExpert, 'top-expert');
  addCerts(rawExpert, 'expert');
  addCerts(rawIntermediate, 'intermediate');
  addCerts(rawBeginner, 'beginner');

  return db;
}

// Initialize Database on load
certDatabase = buildCertDatabase();

// Detail dossiers getter
function getCertDetails(name, level, domain) {
  const normalized = name.toUpperCase().trim();
  if (certInfoDb[normalized]) {
    return {
      name: name,
      ...certInfoDb[normalized],
      level: level,
      domain: domain
    };
  }

  // Fallback generators
  let issuer = getVendorForCert(name);
  if (issuer === "Other") issuer = "Global Security Council";
  
  const levelTitle = level.toUpperCase();
  const prep = level === 'beginner' ? '2 to 4 weeks' : level === 'intermediate' ? '1 to 2 months' : '3 to 6 months';

  return {
    name: name,
    fullName: `${name} Professional Skill Validation`,
    issuer: issuer,
    examFormat: level === 'beginner' ? 'Multiple Choice Theory' : 'Practical Hands-on & Scenario Auditing',
    estPrep: prep,
    description: `This validation node forms part of the ${domain} domain track at the ${levelTitle} tier. Designed to validate professional readiness and industry alignment.`,
    level: level,
    domain: domain
  };
}

/**
 * ==========================================================================
 * LEVEL 1 - MAIN ROADMAP INITIALIZER
 * ==========================================================================
 */
function initMainRoadmap() {
  // Populate Domain Cards Grid
  const gridContainer = document.getElementById('domainDashboardGrid');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';

  Object.keys(domainsMetadata).forEach(domain => {
    const meta = domainsMetadata[domain];
    const certsInDomain = certDatabase.filter(c => c.domain === domain);
    const totalCount = certsInDomain.length;
    const beginnerCount = certsInDomain.filter(c => c.level === 'beginner').length;
    const intermediateCount = certsInDomain.filter(c => c.level === 'intermediate').length;
    const expertCount = certsInDomain.filter(c => c.level === 'expert').length;

    const card = document.createElement('a');
    card.href = meta.filename;
    card.className = 'domain-dashboard-card';
    card.style.setProperty('--accent-color', meta.color);
    card.id = `card-${domain.replace(/[^a-zA-Z0-9]/g, '')}`;

    card.innerHTML = `
      <div class="domain-card-header">
        <div class="domain-card-icon-dot"></div>
        <div class="domain-card-title">${domain}</div>
      </div>
      <div class="domain-card-desc">${meta.desc}</div>
      <div class="domain-card-metrics">
        <div class="domain-metric-item">
          <span class="domain-metric-lbl">Total Stars</span>
          <span class="domain-metric-val">${totalCount}</span>
        </div>
        <div class="domain-metric-item">
          <span class="domain-metric-lbl">Beginner</span>
          <span class="domain-metric-val">${beginnerCount}</span>
        </div>
        <div class="domain-metric-item">
          <span class="domain-metric-lbl">Intermediate</span>
          <span class="domain-metric-val">${intermediateCount}</span>
        </div>
        <div class="domain-metric-item">
          <span class="domain-metric-lbl">Expert</span>
          <span class="domain-metric-val">${expertCount}</span>
        </div>
      </div>
    `;

    // Highlight marker on globe during card hover
    card.addEventListener('mouseenter', () => {
      // Find matching marker on globe and trigger hover state (handled visually on the globe automatically)
    });

    gridContainer.appendChild(card);
  });

  // Calculate overall metrics
  document.getElementById('statTotal').textContent = certDatabase.length;
  document.getElementById('statBeginner').textContent = certDatabase.filter(c => c.level === 'beginner').length;
  document.getElementById('statIntermediate').textContent = certDatabase.filter(c => c.level === 'intermediate').length;
  document.getElementById('statExpert').textContent = certDatabase.filter(c => c.level === 'expert').length;

  // Domain search filter listener
  const domainSearchInput = document.getElementById('domainSearchInput');
  if (domainSearchInput) {
    domainSearchInput.addEventListener('input', () => {
      const q = domainSearchInput.value.toLowerCase().trim();
      document.querySelectorAll('.domain-dashboard-card').forEach(card => {
        const title = card.querySelector('.domain-card-title')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.domain-card-desc')?.textContent.toLowerCase() || '';
        if (!q || title.includes(q) || desc.includes(q)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Initialize main globe
  const globe = new InteractiveGlobe('roadmapGlobeContainer', {
    radius: 170,
    glowColor: 'rgba(224, 90, 0, 0.4)',
    borderColor: 'rgba(224, 90, 0, 0.25)',
    landColor: 'rgba(224, 90, 0, 0.04)',
    autoRotate: true,
    rotateSpeed: 0.8,
    markers: mainGlobeMarkers
  });
}

// Markers mapping for Main Globe (Level 1)
const mainGlobeMarkers = Object.keys(domainsMetadata).map(domain => {
  const meta = domainsMetadata[domain];
  // Retrieve coordinate from vendor list HQs
  let targetHQ = vendorHQs["Other"];
  if (domain.includes("Network")) targetHQ = vendorHQs["Cisco"];
  else if (domain.includes("IAM")) targetHQ = vendorHQs["Microsoft"];
  else if (domain.includes("Architecture")) targetHQ = vendorHQs["SABSA"];
  else if (domain.includes("Operations")) targetHQ = vendorHQs["Security Blue Team"];
  else if (domain.includes("Cloud")) targetHQ = vendorHQs["AWS"];
  else if (domain.includes("Linux")) targetHQ = vendorHQs["Red Hat"];
  else if (domain.includes("GRC")) targetHQ = vendorHQs["ISO/IEC"];
  else if (domain.includes("Forensics")) targetHQ = vendorHQs["GIAC"];
  else if (domain.includes("Incident")) targetHQ = vendorHQs["Other"];
  else if (domain.includes("Penetration")) targetHQ = vendorHQs["Other"]; // Sabhareeshwaran Chennai

  return {
    lat: targetHQ.lat,
    lon: targetHQ.lon,
    label: domain,
    desc: meta.desc,
    color: meta.color,
    url: meta.filename
  };
});

/**
 * ==========================================================================
 * LEVEL 2, 3, 4 - DOMAIN SPECIFIC ROADMAP INITIALIZER
 * ==========================================================================
 */
function initDomainRoadmap(domainName) {
  const domainCerts = certDatabase.filter(c => c.domain === domainName);
  const meta = domainsMetadata[domainName] || { color: '#00f0ff', vendors: ['Other'] };

  // Update Page Header details
  const titleEl = document.getElementById('domainTitle');
  if (titleEl) titleEl.textContent = domainName;
  const descEl = document.getElementById('domainDesc');
  if (descEl) descEl.textContent = domainsMetadata[domainName].desc;

  // Calculate local and global stats
  const globalTotal = certDatabase.length;
  const globalBeginner = certDatabase.filter(c => c.level === 'beginner').length;
  const globalIntermediate = certDatabase.filter(c => c.level === 'intermediate').length;
  const globalExpert = certDatabase.filter(c => c.level === 'expert').length;

  const localTotal = domainCerts.length;
  const localBeginner = domainCerts.filter(c => c.level === 'beginner').length;
  const localIntermediate = domainCerts.filter(c => c.level === 'intermediate').length;
  const localExpert = domainCerts.filter(c => c.level === 'expert').length;

  const padLocal = (num) => String(num).padStart(2, '0');
  const padGlobal = (num) => String(num).padStart(3, '0');

  const totalVal = document.getElementById('domainTotalCount');
  if (totalVal) totalVal.textContent = `${padLocal(localTotal)} / ${padGlobal(globalTotal)}`;
  const begVal = document.getElementById('domainBeginnerCount');
  if (begVal) begVal.textContent = `${padLocal(localBeginner)} / ${padGlobal(globalBeginner)}`;
  const intVal = document.getElementById('domainIntermediateCount');
  if (intVal) intVal.textContent = `${padLocal(localIntermediate)} / ${padGlobal(globalIntermediate)}`;
  const expVal = document.getElementById('domainExpertCount');
  if (expVal) expVal.textContent = `${padLocal(localExpert)} / ${padGlobal(globalExpert)}`;

  // Render Tree
  renderTreeStructure(domainCerts, meta.vendors);

  // Set up telemetry card click handlers on domain sub-pages for filtering by tier
  const totalCard = document.querySelector('.telemetry-card.total');
  const begCard = document.querySelector('.telemetry-card.beginner');
  const intCard = document.querySelector('.telemetry-card.intermediate');
  const expCard = document.querySelector('.telemetry-card.expert');

  const cards = [totalCard, begCard, intCard, expCard];

  const filterByTier = (tier) => {
    cards.forEach(c => c && c.classList.remove('active'));
    if (tier === 'all') {
      if (totalCard) totalCard.classList.add('active');
      document.querySelectorAll('.tree-tier-block').forEach(block => {
        block.style.display = '';
      });
    } else {
      const activeCard = tier === 'beginner' ? begCard : tier === 'intermediate' ? intCard : expCard;
      if (activeCard) activeCard.classList.add('active');
      
      document.querySelectorAll('.tree-tier-block').forEach(block => {
        if (block.classList.contains(tier)) {
          block.style.display = '';
        } else {
          block.style.display = 'none';
        }
      });
    }
  };

  if (totalCard) totalCard.addEventListener('click', () => filterByTier('all'));
  if (begCard) begCard.addEventListener('click', () => filterByTier('beginner'));
  if (intCard) intCard.addEventListener('click', () => filterByTier('intermediate'));
  if (expCard) expCard.addEventListener('click', () => filterByTier('expert'));
  
  if (totalCard) totalCard.classList.add('active');


  // Load Globe Markers based on active vendors in this domain
  const domainMarkers = meta.vendors.map(v => {
    const hq = vendorHQs[v] || vendorHQs["Other"];
    const certsOfVendor = domainCerts.filter(c => c.vendor === v);
    return {
      lat: hq.lat,
      lon: hq.lon,
      label: v,
      desc: `${certsOfVendor.length} Certifications available in this domain.`,
      color: meta.color,
      vendorName: v
    };
  }).filter(m => m !== null);

  // Initialize Globe
  const globe = new InteractiveGlobe('roadmapGlobeContainer', {
    radius: 160,
    glowColor: meta.color,
    borderColor: meta.color + '40',
    landColor: meta.color + '0a',
    autoRotate: true,
    rotateSpeed: 1.0,
    markers: domainMarkers,
    onMarkerClick: (marker) => {
      // Highlight/Filter vendor section in the tree
      filterTreeByVendor(marker.vendorName);
    }
  });

  // Setup Search Filter
  const searchInput = document.getElementById('certSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      filterTreeBySearch(query);
    });
  }

  // Setup Vendor Reset Trigger
  const resetBtn = document.getElementById('resetFilterBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetTreeFilter();
    });
  }
}

// Render Level 2-4 tree (Tiers -> Vendors -> Certs)
function renderTreeStructure(certs, allowedVendors) {
  const treeContainer = document.getElementById('roadmapTree');
  if (!treeContainer) return;

  treeContainer.innerHTML = '';

  const tiers = ['beginner', 'intermediate', 'expert'];

  tiers.forEach(tier => {
    const tierCerts = certs.filter(c => c.level === tier);
    if (tierCerts.length === 0) return;

    // Create Tier Block
    const tierBlock = document.createElement('div');
    tierBlock.className = `tree-tier-block ${tier}`;
    
    const displayTierName = tier === 'beginner' ? 'Beginner / Foundation' : tier === 'intermediate' ? 'Intermediate / Associate' : 'Expert / Specialty';
    
    tierBlock.innerHTML = `
      <div class="tree-tier-header">
        <div class="tree-tier-title">
          <div class="tree-tier-dot" style="color: ${tier === 'beginner' ? '#00b4d8' : tier === 'intermediate' ? '#ffb703' : '#d90429'};"></div>
          <span>${displayTierName}</span>
        </div>
        <span class="tree-tier-badge">${tierCerts.length} Stars</span>
      </div>
      <div class="tier-vendors-container" id="container-${tier}"></div>
    `;

    treeContainer.appendChild(tierBlock);
    const vendorsContainer = tierBlock.querySelector(`.tier-vendors-container`);

    // Group certs by vendor inside this tier
    const vendorGroups = {};
    tierCerts.forEach(c => {
      if (!vendorGroups[c.vendor]) {
        vendorGroups[c.vendor] = [];
      }
      vendorGroups[c.vendor].push(c);
    });

    // Render Vendors and Cards
    Object.keys(vendorGroups).sort().forEach(vendor => {
      const vendorCerts = vendorGroups[vendor];
      const vendorSection = document.createElement('div');
      vendorSection.className = 'vendor-section';
      vendorSection.setAttribute('data-vendor', vendor);

      vendorSection.innerHTML = `
        <div class="vendor-title">${vendor}</div>
        <div class="cert-cards-grid"></div>
      `;

      vendorsContainer.appendChild(vendorSection);
      const cardsGrid = vendorSection.querySelector('.cert-cards-grid');

      vendorCerts.forEach(c => {
        const card = document.createElement('div');
        card.className = 'cert-card';
        card.setAttribute('data-cert-name', c.name.toLowerCase());
        
        const details = getCertDetails(c.name, c.level, c.domain);

        card.innerHTML = `
          <div>
            <div class="cert-card-code">${c.name}</div>
            <div class="cert-card-name">${details.fullName}</div>
          </div>
          <div class="cert-card-footer">
            <span class="cert-card-issuer">${details.issuer}</span>
            <span class="cert-card-prep">${details.estPrep}</span>
          </div>
        `;

        card.addEventListener('click', () => {
          openDrawer(c.name, c.level, c.domain);
        });

        cardsGrid.appendChild(card);
      });
    });
  });
}

// Filter tree by vendor selection
function filterTreeByVendor(vendorName) {
  // Show reset filter alert / badge
  const activeFilterIndicator = document.getElementById('activeFilterIndicator');
  if (activeFilterIndicator) {
    activeFilterIndicator.style.display = 'flex';
    document.getElementById('filterVendorName').textContent = vendorName;
  }

  document.querySelectorAll('.vendor-section').forEach(section => {
    if (section.getAttribute('data-vendor') === vendorName) {
      section.style.display = 'flex';
    } else {
      section.style.display = 'none';
    }
  });

  // Hide empty tier blocks
  document.querySelectorAll('.tree-tier-block').forEach(block => {
    const visibleSections = Array.from(block.querySelectorAll('.vendor-section')).filter(s => s.style.display !== 'none');
    if (visibleSections.length === 0) {
      block.style.display = 'none';
    } else {
      block.style.display = 'block';
    }
  });
}

// Reset vendor filter
function resetTreeFilter() {
  const activeFilterIndicator = document.getElementById('activeFilterIndicator');
  if (activeFilterIndicator) activeFilterIndicator.style.display = 'none';

  document.querySelectorAll('.vendor-section, .tree-tier-block').forEach(el => {
    el.style.display = '';
  });
}

// Filter tree by search query
function filterTreeBySearch(query) {
  if (!query) {
    resetTreeFilter();
    document.querySelectorAll('.cert-card').forEach(c => c.style.display = '');
    return;
  }

  document.querySelectorAll('.cert-card').forEach(card => {
    const name = card.getAttribute('data-cert-name');
    if (name.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });

  // Hide empty vendor sections
  document.querySelectorAll('.vendor-section').forEach(section => {
    const visibleCards = Array.from(section.querySelectorAll('.cert-card')).filter(c => c.style.display !== 'none');
    if (visibleCards.length === 0) {
      section.style.display = 'none';
    } else {
      section.style.display = '';
    }
  });

  // Hide empty tier blocks
  document.querySelectorAll('.tree-tier-block').forEach(block => {
    const visibleSections = Array.from(block.querySelectorAll('.vendor-section')).filter(s => s.style.display !== 'none');
    if (visibleSections.length === 0) {
      block.style.display = 'none';
    } else {
      block.style.display = 'block';
    }
  });
}

// Global Drawer controls
function openDrawer(name, level, domain) {
  // Trigger sound effect if audioCtx loaded
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(620, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch(e) {}

  const detail = getCertDetails(name, level, domain);
  const meta = domainsMetadata[domain] || { color: '#00f0ff' };
  
  // Convert hex color to rgb
  const hex = meta.color;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const rgb = `${r}, ${g}, ${b}`;

  document.getElementById('drawerCertCode').textContent = detail.name;
  document.getElementById('drawerCertFullname').textContent = detail.fullName;
  document.getElementById('drawerCertDomain').textContent = detail.domain;

  const levelTitle = level.toUpperCase();
  document.getElementById('drawerCertLevel').textContent = `${levelTitle} | Tier ${level === 'beginner' ? 1 : level === 'intermediate' ? 2 : 3}`;
  document.getElementById('drawerCertIssuer').textContent = detail.issuer;
  document.getElementById('drawerCertExamFormat').textContent = detail.examFormat;
  document.getElementById('drawerCertPrep').textContent = detail.estPrep;
  document.getElementById('drawerCertDesc').textContent = detail.description;

  const queryBtn = document.getElementById('drawerQueryBtn');
  const normalized = name.toUpperCase().trim();
  if (typeof certLinks !== 'undefined' && certLinks[normalized]) {
    queryBtn.href = certLinks[normalized];
    queryBtn.textContent = "LAUNCH_OFFICIAL_PORTAL";
  } else {
    queryBtn.href = `https://www.google.com/search?q=${encodeURIComponent(detail.issuer + ' ' + detail.fullName + ' certification')}`;
    queryBtn.textContent = "INITIALIZE_EXTERNAL_INTEL_QUERY";
  }

  const subwayDrawer = document.getElementById('subwayDrawer');
  subwayDrawer.style.setProperty('--accent-rgb', rgb);
  subwayDrawer.style.borderLeftColor = meta.color;
  subwayDrawer.classList.add('open');
}

function closeDrawer() {
  const subwayDrawer = document.getElementById('subwayDrawer');
  if (subwayDrawer) subwayDrawer.classList.remove('open');
}

// Bind standard drawer controls
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn1 = document.getElementById('drawerClose');
  const closeBtn2 = document.getElementById('drawerCloseBtn');
  if (closeBtn1) closeBtn1.addEventListener('click', closeDrawer);
  if (closeBtn2) closeBtn2.addEventListener('click', closeDrawer);
});
