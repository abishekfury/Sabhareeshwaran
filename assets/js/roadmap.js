/**
 * Cybersecurity Certification Roadmap Engine - 481 Certifications
 * Interactive 8-Domain Matrix & Domain Explorer
 */

// Full Cert Links Map (481 Certifications)
const certLinks = {
  "OSEE": "https://www.offensive-security.com/awe-osee/",
  "CCIE Sec": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccie-security.html",
  "CREST CRTSA": "https://www.crest-approved.org/examination/technical-security-architecture/index.html",
  "ITIL Master": "https://www.axelos.com/certifications/itil-certifications/itil-master",
  "OSCE3": "https://help.offensive-security.com/hc/en-us/articles/4403282452628-What-is-OSCE3-",
  "CCIE Ent": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccie-security-v2.html",
  "VCDX DCV": "https://www.vmware.com/education-services/certification/vcdx-dcv.html",
  "RHCA": "https://www.redhat.com/en/services/certification/rhca",
  "SABSA SCM": "https://sabsa.org/certification/",
  "GSE": "https://www.giac.org/get-certified/giac-portfolio-certifications/#GSE",
  "GREM": "https://www.giac.org/certifications/reverse-engineering-malware-grem/",
  "OSWE": "https://www.offensive-security.com/awae-oswe/",
  "OSEP": "https://www.offensive-security.com/pen300-osep/",
  "OSED": "https://www.offensive-security.com/exp301-osed/",
  "PgMP": "https://www.pmi.org/certifications/types/program-management-pgmp",
  "CISSP Concentrations": "https://www.isc2.org/certifications#Specialized",
  "NCSC CCPLP": "https://www.ncsc.gov.uk/information/about-certified-professional-scheme",
  "CFCE": "https://www.iacis.com/certification/",
  "GXPN": "https://www.giac.org/certification/gxpn",
  "VCIX DCV": "https://www.vmware.com/education-services/certification/vcap-dcv-design.html",
  "ASIS CPP": "https://www.asisonline.org/certification/certified-protection-professional-cpp/",
  "Zach EAPro": "https://www.zachman.com/certification/what-we-certify/enterprise-architect",
  "PMP": "https://www.pmi.org/certifications/project-management-pmp",
  "CISM": "https://www.isaca.org/credentialing/cism",
  "S-ISME": "https://www.seco-institute.org/certifications/information-security-certification-track/",
  "NCSC CCPSP": "https://www.ncsc.gov.uk/information/about-certified-professional-scheme",
  "CSFA": "https://www.csiac.org/certification/cybersecurity-forensic-analyst-csfa-certification/",
  "GIME": "https://www.giac.org/certifications/ios-macos-examiner-gime/",
  "GAWN": "https://www.giac.org/certification/gawn",
  "CISSP": "https://www.isc2.org/Certifications/CISSP",
  "CCD": "https://cyberdefenders.org/blue-team-training/courses/certified-cyberdefender-certification/",
  "CAWFE": "https://www.iacis.com/certification/cawfe/",
  "GCFA": "https://www.giac.org/certification/gcfa",
  "GCTI": "https://www.giac.org/certification/gcti",
  "CREST CSAM": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-simulated-attack-manager",
  "JNCIE Sec": "https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jnciesec",
  "CCDE": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccde.html",
  "AWS SAP": "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
  "RHCE": "https://www.redhat.com/en/services/certification/rhce",
  "GDAT": "https://www.giac.org/certification/defending-advanced-threats-gdat",
  "SC-100": "https://docs.microsoft.com/en-us/certifications/exams/sc-100",
  "TOGAF": "https://www.opengroup.org/certifications/togaf",
  "CCISO": "https://ciso.eccouncil.org/cciso-certification/",
  "EEXIN ISM": "https://www.exin.com/certifications/information-security-management-expert-based-isoiec-27001-exam",
  "GSTRT": "https://www.giac.org/certification/gstrt",
  "NCSC CCPP": "https://www.ncsc.gov.uk/information/about-certified-professional-scheme",
  "GSNA": "https://www.giac.org/certification/gsna",
  "CFSR": "https://www.opentext.com/products-and-solutions/services/training-and-learning-services/encase-training/forensic-security-responder-certification",
  "GNFA": "https://www.giac.org/certification/network-forensic-analyst-gnfa",
  "eWPTX": "https://elearnsecurity.com/product/ewptxv2-certification/",
  "CREST CCSAS": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-simulated-attack-specialist",
  "FCX": "https://training.fortinet.com/local/staticpage/view.php?page=fcx_cybersecurity",
  "AZ-305": "https://docs.microsoft.com/en-us/learn/certifications/azure-solutions-architect?wt.mc_id=learningredirect_certs-web-wwl",
  "VCIX NV": "https://www.vmware.com/education-services/certification/vcap-nv-deploy.html",
  "LPIC-3": "https://www.lpi.org/our-certifications/lpic-3-303-overview",
  "SABSA SCP": "https://sabsa.org/certification/",
  "PSM III": "https://www.scrum.org/assessments/professional-scrum-master-iii-certification",
  "GSP": "https://www.giac.org/get-certified/giac-portfolio-certifications/#gsp",
  "GISP": "https://www.giac.org/certification/gisp",
  "MTIA": "https://www.mosse-institute.com/certifications/mtia-certified-threat-intelligence-analyst.html",
  "GCFR": "https://www.giac.org/certifications/cloud-forensics-responder-gcfr/",
  "BTL2": "https://securityblue.team/btl2/",
  "MRT": "https://www.mosse-institute.com/certifications/mrt-certified-red-teamer.html",
  "CREST CCTINF": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-infrastructure-tester/",
  "HTB CWEE": "https://academy.hackthebox.com/preview/certifications/htb-certified-web-exploitation-expert",
  "Google PCSA": "https://cloud.google.com/certification/cloud-architect",
  "SCE": "https://www.suse.com/training/exam/sce-sles-15/",
  "ISA CE": "https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/",
  "GDSA": "https://www.giac.org/certification/defensible-security-architecture-gdsa",
  "ITIL SL": "https://www.axelos.com/certifications/itil-certifications/itil-strategic-leader-itil-4",
  "Zach EAP": "https://www.zachman.com/certification/what-we-certify/enterprise-architect",
  "GSLC": "https://www.giac.org/certification/gslc",
  "S-CISO": "https://www.seco-institute.org/certifications/information-security-certification-track/",
  "GCFE": "https://www.giac.org/certification/gcfe",
  "GEIR": "https://www.giac.org/certifications/enterprise-incident-responder-geir/",
  "PACES": "https://www.pentesteracademy.com/gcb",
  "S-CEHL": "https://www.seco-institute.org/certifications/ethical-hacking-track/leader/",
  "CREST CRT": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-registered-penetration-tester",
  "CRTO II": "https://training.zeropointsecurity.co.uk/courses/red-team-ops-ii",
  "MCD": "https://www.mosse-institute.com/certifications/mcd-certified-code-deobfuscation-specialist.html",
  "CCNP Sec": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-security-v2.html",
  "CIMP": "https://www.identitymanagementinstitute.org/cimp/",
  "CASP+": "https://www.comptia.org/certifications/comptia-advanced-security-practitioner",
  "GASF": "https://www.giac.org/certification/advanced-smartphone-forensics-gasf",
  "eCTHP": "https://security.ine.com/certifications/ecthp-certification/",
  "S-EHE": "https://www.seco-institute.org/certifications/ethical-hacking-certification-track/",
  "JNCIP Sec": "https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jncip-sec",
  "PCNSE": "https://www.paloaltonetworks.com/services/education/certification#pcnse",
  "FCSS ZTA": "https://training.fortinet.com/local/staticpage/view.php?page=fcss_zta",
  "FCSS SASE": "https://training.fortinet.com/local/staticpage/view.php?page=fcss_SASE",
  "FCSS PCS": "https://training.fortinet.com/local/staticpage/view.php?page=fcss_public_cloud_security",
  "GCTD": "https://www.giac.org/certifications/cloud-threat-detection-gctd/",
  "CACE": "https://www.exidacace.com/Apply/CACE",
  "ITIL MP": "https://www.axelos.com/certifications/itil-certifications/itil-managing-professional-itil-4",
  "Scrum SPS": "https://www.scrum.org/scaled-professional-scrum-certification",
  "GLEG": "https://www.giac.org/certification/law-data-security-investigations-gleg",
  "CISSM": "https://gaqm.org/certifications/information_systems_security/cissm",
  "CGRC": "https://www.isc2.org/Certifications/CGRC",
  "CRISC": "https://www.isaca.org/credentialing/crisc",
  "GCCC": "https://www.giac.org/certification/critical-controls-certification-gccc",
  "PCI QSA": "https://www.pcisecuritystandards.org/assessors_and_solutions/become_qsa/",
  "GWEB": "https://www.giac.org/certification/certified-web-application-defender-gweb",
  "Cisco COP": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/cyberops-professional.html",
  "CCFE": "https://app.infosecinstitute.com/portal/courses/a0t1A000009H5RcQAK",
  "GCED": "https://www.giac.org/certification/certified-enterprise-defender-gced",
  "MCPE": "https://www.mosse-institute.com/certifications/mcpe-certified-cyber-protection-expert.html",
  "CREST CCTIM": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-threat-intelligence-manager",
  "OSCP": "https://www.offensive-security.com/pwk-oscp/",
  "F5 CSE Sec": "https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740",
  "CCNP Ent": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-enterprise.html",
  "MS-100": "https://docs.microsoft.com/en-us/learn/certifications/m365-enterprise-administrator",
  "GPCS": "https://www.giac.org/certifications/public-cloud-security-gpcs/",
  "GCSA": "https://www.giac.org/certification/cloud-security-automation-gcsa",
  "GCWN": "https://www.giac.org/certifications/certified-windows-security-administrator-gcwn/",
  "GRID": "https://www.giac.org/certification/response-industrial-defense-grid",
  "CIS LI": "https://www.itgovernance.co.uk/shop/product/certified-iso-27001-isms-lead-implementer-training-course",
  "CIPT": "https://iapp.org/certify/cipt/",
  "CDPSE": "https://www.isaca.org/credentialing/certified-data-privacy-solutions-engineer",
  "CSM": "https://gaqm.org/certifications/scrum_agile/csm",
  "CASM": "https://gaqm.org/certifications/scrum_agile/casm",
  "CM)ISSO": "https://www.mile2.com/master-certifications/",
  "S-ISP": "https://www.seco-institute.org/certifications/information-security-certification-track/",
  "CISA": "https://www.isaca.org/credentialing/cisa",
  "GMON": "https://www.giac.org/certification/continuous-monitoring-certification-gmon",
  "CIS LA": "https://www.itgovernance.co.uk/shop/product/certified-iso-27001-isms-lead-auditor-training-course",
  "S-CSPL": "https://www.seco-institute.org/certifications/certified-secure-software-developer/",
  "GCDA": "https://www.giac.org/certification/certified-detection-analyst-gcda",
  "CMFE": "https://app.infosecinstitute.com/portal/courses/a0t1A000009H6juQAC",
  "GX-FA": "https://www.giac.org/certifications/experienced-forensics-analyst-gxfa/",
  "GCIH": "https://www.giac.org/certification/gcih",
  "GX-PT": "https://www.giac.org/certifications/experienced-penetration-tester-gxpt/",
  "GPEN": "https://www.giac.org/certification/gpen",
  "OSWP": "https://www.offensive-security.com/wifu-oswp/",
  "CRTO": "https://courses.zeropointsecurity.co.uk/courses/red-team-ops",
  "CCSM": "https://training-certifications.checkpoint.com/#/courses/Check%20Point%20Certified%20Master%20https://training-certifications.checkpoint.com/#/courses/Check%20Point%20Certified%20Master%20%28CCSM%29%20R80.x",
  "PCSAE": "https://www.paloaltonetworks.com/services/education/certification",
  "PCCSE": "https://www.paloaltonetworks.com/services/education/certification",
  "CIAM": "https://www.identitymanagementinstitute.org/ciam/",
  "FCSS SO": "https://training.fortinet.com/local/staticpage/view.php?page=fcss_security_operations",
  "PDSO CDE": "https://www.practical-devsecops.com/certified-devsecops-expert",
  "VCP DCV": "https://www.vmware.com/education-services/certification/vcp-dcv.html",
  "CKS": "https://www.cncf.io/certification/cks/",
  "LFCS": "https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/",
  "FCSS OT": "https://training.fortinet.com/local/staticpage/view.php?page=fcss_ot_security",
  "CSSA": "https://app.infosecinstitute.com/portal/courses/a0tC0000000Fp4JIAS",
  "Scrum PSD": "https://www.scrum.org/professional-scrum-developer-certification",
  "GCPM": "https://www.giac.org/certification/gcpm",
  "BCS PCIRM": "https://www.bcs.org/get-qualified/certifications-for-professionals/information-security-and-ccp-scheme-certifications/bcs-practitioner-certificate-in-information-risk-management/",
  "PEXIN ISM": "https://www.exin.com/certifications/information-security-management-professional-based-isoiec-27001-exam",
  "MGRC": "https://www.mosse-institute.com/certifications/mgrc-certified-grc-practitioner.html",
  "CSSLP": "https://www.isc2.org/Certifications/CSSLP",
  "MTH": "https://www.mosse-institute.com/certifications/mth-certified-threat-hunter.html",
  "CDRP": "https://app.infosecinstitute.com/portal/courses/a0tC0000000FovhIAC",
  "eCDFP": "https://security.ine.com/certifications/ecdfp-certification/",
  "GPYC": "https://www.giac.org/certification/python-coder-gpyc",
  "MDFIR": "https://www.mosse-institute.com/certifications/mdfir-certified-dfir-specialist.html",
  "LPT": "https://www.eccouncil.org/programs/licensed-penetration-tester-lpt-master/",
  "PNPT": "https://certifications.tcm-sec.com/pnpt/",
  "GCPN": "https://www.giac.org/certification/gcpn",
  "GRTP": "https://www.giac.org/certifications/red-team-professional-grtp/",
  "SOG CAPenX": "https://secops.group/product/certified-appsec-pentesting-expert-capenx/",
  "GMOB": "https://www.giac.org/certification/mobile-device-security-analyst-gmob",
  "FCSS NS": "https://training.fortinet.com/local/staticpage/view.php?page=fcss_network_security",
  "CIDPRO": "https://idpro.org/cidpro/",
  "CCSP": "https://www.isc2.org/Certifications/CCSP",
  "FCP PCS": "https://training.fortinet.com/local/staticpage/view.php?page=fcp_public_cloud_security",
  "FCP SO": "https://training.fortinet.com/local/staticpage/view.php?page=fcp_security_operations",
  "RHCSA": "https://www.redhat.com/en/services/certification/rhcsa",
  "ISA CDS": "https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/",
  "SFCTA": "https://trailhead.salesforce.com/help?article=Salesforce-Certified-Technical-Architect-Exam-Guide",
  "EPDPP": "https://embed.exin.totalservices.io/certifications/exin-privacy-and-data-protection-practitioner-exam",
  "M_o_R P": "https://www.axelos.com/certifications/propath/mor-risk-management/mor-4-practitioner",
  "CPD": "https://gaqm.org/certifications/project_management/cpd",
  "PMI ACP": "https://www.pmi.org/certifications/types/agile-acp",
  "EISM": "https://ciso.eccouncil.org/cciso-certification/eism-program/",
  "CGEIT": "https://www.isaca.org/credentialing/cgeit",
  "EXIN 27001E": "https://www.exin.com/certifications/information-security-management-expert-based-isoiec-27001-exam?language_content_entity=en",
  "PECB 27005LM": "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-27005-lead-risk-manager",
  "DCCRP": "https://drii.org/certification/ccrp",
  "GCIA": "https://www.giac.org/certification/certified-intrusion-analyst-gcia",
  "CTPRA": "https://sharedassessments.org/ctpra/",
  "PECB 27001LA": "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-lead-auditor",
  "DevNet Pro": "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/devnet/professional/index.html",
  "SC-400": "https://docs.microsoft.com/en-us/learn/certifications/information-protection-administrator/",
  "CCE": "https://www.isfce.com/certification.htm",
  "CM)DFI": "https://www.mile2.com/master-certifications/",
  "CREST CRIA": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-registered-intrusion-analyst",
  "CREST CRTIA": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-registered-threat-intelligence-analyst",
  "GWAPT": "https://www.giac.org/certification/gwapt",
  "OSMR": "https://www.offensive-security.com/exp312-osmr/",
  "GCPT": "https://gaqm.org/certifications/information_systems_security/certified_penetration_tester_cpt",
  "CCPenX-AWS": "https://secops.group/product/certified-cloud-pentesting-expert/",
  "CCSE": "https://cert.eccouncil.org/certified-cloud-security-engineer.html",
  "AWS CSS": "https://aws.amazon.com/certification/certified-security-specialty/",
  "SFCCCC": "https://trailhead.salesforce.com/help?article=Salesforce-Certified-Community-Cloud-Consultant-Exam-Guide",
  "EXIN PCSA": "https://www.exin.com/certifications/ccc-professional-cloud-solution-architect-exam",
  "CKA": "https://www.cncf.io/certification/cka/",
  "TUV COTCP": "https://www.tuv.com/landingpage/en/lp-certified-operational-technology-cybersecurity-professional-program/",
  "SABSA SCF": "https://sabsa.org/certification/",
  "CIPA": "https://www.identitymanagementinstitute.org/cipa/",
  "DCPP": "https://www.dsci.in/content/dsci-certified-privacy-professional-dcpp",
  "Scrum PAL": "https://www.scrum.org/professional-agile-leadership-certification",
  "CAPM": "https://www.pmi.org/certifications/types/certified-associate-capm",
  "PSM II": "https://www.scrum.org/assessments/professional-scrum-master-ii-certification",
  "APMG 20000P": "https://apmg-international.com/product/iso-iec-20000",
  "C)ISRM": "https://www.mile2.com/information-systems-risk-mangager-outline/",
  "APMG 27001P": "https://apmg-international.com/product/isoiec-27001",
  "PECB 27001LI": "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-lead-implementer",
  "IS20": "https://www.mile2.com/is20_outline/",
  "C)ISSA": "https://www.mile2.com/information_systems_security_auditor_outline/",
  "APMG 27001A": "https://apmg-international.com/product/isoiec-27001",
  "CASE": "https://www.eccouncil.org/programs/certified-application-security-engineer-case/",
  "C)DRE": "https://www.mile2.com/cdre_outline/",
  "GSOC": "https://www.giac.org/certifications/security-operations-certified-gsoc/",
  "GBFA": "https://www.giac.org/certification/gbfa",
  "BTL1": "https://www.securityblue.team/why-btl1/",
  "MBT": "https://www.mosse-institute.com/certifications/mbt-certified-blue-teamer.html",
  "MPT": "https://www.mosse-institute.com/certifications/mpt-certified-penetration-tester.html",
  "CPENT": "https://www.eccouncil.org/programs/certified-penetration-testing-professional-cpent/",
  "CREST CCTAPP": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-web-application-tester/",
  "HTB CPTS": "https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist/",
  "MRE": "https://www.mosse-institute.com/certifications/mre-certified-reverse-engineer.html",
  "JNCIS Sec": "https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jncisec",
  "GMLE": "https://www.giac.org/certifications/machine-learning-engineer-gmle/",
  "CREST CCHIA": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-host-intrusion-analyst",
  "EnCE": "https://www.opentext.com/products-and-solutions/services/training-and-learning-services/encase-training/examiner-certification",
  "ACE": "https://accessdata.com/training/computer-forensics-certification",
  "eCIR": "https://security.ine.com/certifications/ecir-certification/",
  "C)IHE": "https://www.mile2.com/cihe_outline/",
  "CSTL": "https://thecyberscheme.org/cyber-scheme-team-leader-cstl-exam/",
  "eCPPT": "https://security.ine.com/certifications/ecppt-certification/",
  "eWPT": "https://security.ine.com/certifications/ewpt-certification/",
  "CM)IPS": "https://www.mile2.com/master-certifications/",
  "HTB CBBH": "https://academy.hackthebox.com/preview/certifications/htb-certified-bug-bounty-hunter/",
  "PJMR": "https://certifications.tcm-sec.com/pjmr/",
  "F5 CTS APM": "https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740",
  "FCP NS": "https://training.fortinet.com/local/staticpage/view.php?page=fcp_network_security",
  "CCNA": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
  "AZ-500": "https://docs.microsoft.com/en-us/learn/certifications/azure-security-engineer?wt.mc_id=learningredirect_certs-web-wwl",
  "CSA CGC": "https://cloudsecurityalliance.org/education/cloud-governance-and-compliance/",
  "VCP NV": "https://www.vmware.com/education-services/certification/vcp-nv-tracks.html",
  "CKAD": "https://www.cncf.io/certification/ckad/",
  "LPIC-2": "https://www.lpi.org/our-certifications/lpic-2-overview",
  "GCIP": "https://www.giac.org/certification/critical-infrastructure-protection-gcip",
  "CDP": "https://www.identitymanagementinstitute.org/cdp/",
  "CCP": "https://ecfirst.biz/index.php?route=product/product&path=59_83&product_id=281",
  "C)ISSO": "https://www.mile2.com/cisso_outline/",
  "CIS RM": "https://www.itgovernance.co.uk/shop/product/iso-27005-certified-isms-risk-management",
  "EXIN 27001P": "https://www.exin.com/certifications/information-security-management-professional-based-isoiec-27001-exam",
  "PECB 27032CM": "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27032/iso-iec-27032-lead-cyber-security-manager",
  "C)HISSP": "https://www.mile2.com/chissp_outline/",
  "APMG 20000A": "https://apmg-international.com/product/iso-iec-20000",
  "C)ISMS-LA": "https://www.mile2.com/cisms-la-li-outline/",
  "CIS IA": "https://www.itgovernance.co.uk/shop/product/iso27001-certified-isms-internal-auditor-training-course",
  "CASST": "https://gaqm.org/certifications/software_security_testing/casst",
  "OSIP": "https://inteltechniques.com/training-osip.html",
  "Cisco COA": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/cyberops-associate.html",
  "C)CSA": "https://www.mile2.com/ccsa_outline/",
  "CHFI": "https://www.eccouncil.org/programs/computer-hacking-forensic-investigator-chfi/",
  "S-TA": "https://www.seco-institute.org/get-trained/cyber-defense-track/threat-analyst-certification/",
  "ECIH": "https://www.eccouncil.org/programs/ec-council-certified-incident-handler-ecih/",
  "C)PSH": "https://www.mile2.com/cpSH_outline/",
  "CMWAPT": "https://app.infosecinstitute.com/portal/courses/a0tC0000000Fow6IAC",
  "C)PTC": "https://mile2.com/cptc_outline/",
  "CRTOP": "https://app.infosecinstitute.com/portal/courses/a0t0y00000BK8IcAAL",
  "CSR": "https://cyberstruggle.org/ranger-certification/",
  "F5 CTS DNS": "https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740",
  "PCDRA": "https://www.paloaltonetworks.com/services/education/certification",
  "SF CIAMD": "https://trailhead.salesforce.com/help?article=Salesforce-Certified-Identity-and-Access-Management-Designer-Exam-Guide",
  "GCLD": "https://www.giac.org/certifications/cloud-security-essentials-gcld/",
  "AWS SAA": "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  "EXIN PCSerM": "https://www.exin.com/certifications/ccc-professional-cloud-service-manager-exam",
  "ISA CRAS": "https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/",
  "SPLK-3001": "https://www.splunk.com/en_us/training/certification-track/splunk-es-certified-admin.html",
  "BCS PCIAA": "https://www.bcs.org/get-qualified/certifications-for-professionals/information-security-and-ccp-scheme-certifications/bcs-practitioner-certificate-in-information-assurance-architecture/",
  "CCSA": "https://training-certifications.checkpoint.com/#/courses/Check%20Point%20Certified%20Admin%20https://training-certifications.checkpoint.com/#/courses/Check%20Point%20Certified%20Admin%20%28CCSA%29%20R80.x",
  "PPM": "https://gaqm.org/certifications/project_management/ppm",
  "C)ISSM": "https://mile2.com/cissm_outline/",
  "TUV ITSM": "https://www.certipedia.com/quality_marks/0000063483?locale=en",
  "CCRMP": "https://www.itgovernance.co.uk/shop/product/managing-cyber-security-risk-training-course",
  "PECB 27005RM": "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-iec-27005-risk-manager",
  "CSBA": "https://www.softwarecertifications.org/csba/",
  "DCBCLA": "https://drii.org/certification/cbcla",
  "TUV MSA": "https://www.certipedia.com/quality_marks/0000046324?locale=en",
  "DevNet A": "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/devnet/associate/index.html",
  "CySA+": "https://www.comptia.org/certifications/cybersecurity-analyst",
  "CSX-P": "https://cybersecurity.isaca.org/csx-certifications/csx-practitioner-certification",
  "C)NFE": "https://www.mile2.com/network-forensics-examiner-outline/",
  "GOSI": "https://www.giac.org/certification/open-source-intelligence-gosi",
  "C)TIA": "https://www.mile2.com/threat-analyst/",
  "OSDA": "https://www.offensive-security.com/soc200-osda/",
  "eMAPT": "https://security.ine.com/certifications/emapt-certification/",
  "BSCP": "https://portswigger.net/web-security/certification",
  "OPST": "https://www.isecom.org/certification.html",
  "OSWA": "https://www.offensive-security.com/web200-oswa/",
  "CREA": "https://app.infosecinstitute.com/portal/courses/a0tC0000000Fp4IIAS",
  "CWSP": "https://www.cwnp.com/certifications/cwsp",
  "CREST CCNIA": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-network-intrusion-analyst",
  "CIGE": "https://www.identitymanagementinstitute.org/cige/",
  "AZ-104": "https://docs.microsoft.com/en-us/learn/certifications/azure-administrator?wt.mc_id=learningredirect_certs-web-wwl",
  "CLCSM": "https://pecb.com/en/education-and-certification-for-individuals/cloud-security/lead-cloud-security-manager",
  "MCSE": "https://www.mosse-institute.com/certifications/mcse-certified-cloud-security-engineer.html",
  "SFSA": "https://trailhead.salesforce.com/credentials/systemarchitect",
  "ASIS APP": "https://www.asisonline.org/certification/associate-protection-professional-app/",
  "CNDA": "https://www.eccouncil.org/programs/certified-network-defense-architect-cnda/",
  "DACRP": "https://drii.org/certification/acrp",
  "CISRM": "https://www.itgovernance.co.uk/shop/product/iso-27005-certified-isms-risk-management",
  "DCRMP": "https://drii.org/certification/crmp",
  "SSAP": "https://www.sans.org/security-awareness-training/career-development/credential/",
  "GRCP": "https://www.oceg.org/certifications/grc-professional-certification/",
  "SACP": "https://www.thehlayer.com/about-exam/",
  "CISP": "https://gaqm.org/certifications/information_systems_security/cisp",
  "TUV Auditor": "https://www.certipedia.com/quality_marks/0000063484?locale=en",
  "CTPRP": "https://sharedassessments.org/ctprp/",
  "IIA CIA": "https://na.theiia.org/certification/CIA-Certification/Pages/CIA-Certification.aspx",
  "CCSC": "https://certnexus.com/certification/cyber-secure-coder/",
  "SC-200": "https://docs.microsoft.com/en-us/learn/certifications/security-operations-analyst/",
  "MRCI": "https://www.mosse-institute.com/certifications/mrci-remote-cybersecurity-internship.html",
  "EDRP": "https://www.eccouncil.org/programs/disaster-recovery-professional-edrp/",
  "HTB CDSA": "https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst",
  "CFR": "https://certnexus.com/certification/cybersec-first-responder/",
  "CTIA": "https://www.eccouncil.org/programs/certified-threat-intelligence-analyst-ctia/",
  "CSTM": "https://thecyberscheme.org/cyber-scheme-team-member-cstm-exam/",
  "eJPT": "https://ine.com/learning/certifications/internal/elearnsecurity-junior-penetration-tester-v2",
  "S-EHP": "https://www.seco-institute.org/certifications/ethical-hacking-certification-track/ethical-hacking-practitioner/",
  "CHAT": "https://www.isecom.org/certification.html",
  "CREST CPSA": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-practitioner-security-analyst",
  "F5 CA": "https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740",
  "eNDP": "https://www.elearnsecurity.com/certification/endp/",
  "CIST": "https://www.identitymanagementinstitute.org/cist/",
  "Google PCSE": "https://cloud.google.com/certification/cloud-security-engineer",
  "EXIN PCSM": "https://www.exin.com/certifications/ccc-professional-cloud-security-manager-exam",
  "MDSO": "https://www.mosse-institute.com/certifications/mdso-certified-devsecops-engineer.html",
  "SCA": "https://www.suse.com/training/exam/sca-sles-15/",
  "ISA CAP": "https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/",
  "TUV COSM": "https://limessecurity.com/en/academy/ics-211/",
  "Zach EAA": "https://www.zachman.com/certification/what-we-certify/enterprise-architect",
  "CAD": "https://gaqm.org/certifications/scrum_agile/cad",
  "CAC": "https://gaqm.org/certifications/scrum_agile/cac",
  "ISMI CSMP": "https://www.ismi.org.uk/csmp/csmp%C2%AE-overview.aspx",
  "CSCS": "https://ecfirst.biz/index.php?route=product/product&path=59_61&product_id=89",
  "APMG 27001F": "https://apmg-international.com/product/isoiec-27001",
  "PECB 27001F": "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-foundation",
  "C)SLO": "https://www.mile2.com/cslo_outline/",
  "DCBCA": "https://drii.org/certification/cbca",
  "GRCA": "https://www.oceg.org/certifications/grc-audit-certification/",
  "CISST": "https://gaqm.org/certifications/information_systems_security/cisst",
  "C)SWAE": "https://www.mile2.com/cswae_outline/",
  "OPSA": "https://www.isecom.org/certification.html",
  "CSAE": "https://cyberstruggle.org/aegis-certification/",
  "ASIS PCI": "https://www.asisonline.org/certification/professional-certified-investigator-pci",
  "MAD SOCA": "https://mitre-engenuity.org/mad/",
  "MAD CTI": "https://mitre-engenuity.org/mad/",
  "CEH": "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
  "SOG CAPen": "https://secops.group/product/certified-appsec-pentester/",
  "C)PTE": "https://www.mile2.com/penetration-testing-engineer-outline/",
  "SOG CNPen": "https://secops.group/product/certified-network-pentester/",
  "DV RTOS": "https://0xdarkvortex.dev/training-programs/red-team-and-operational-security/",
  "DV OTD": "https://0xdarkvortex.dev/training-programs/offensive-tool-development/",
  "MVRE": "https://www.mosse-institute.com/certifications/mvre-vulnerability-researcher-and-exploitation-specialist.html",
  "MNSE": "https://www.mosse-institute.com/certifications/mnse-network-security-essentials.html",
  "PCNSA": "https://www.paloaltonetworks.com/services/education/certification",
  "OWSE": "https://www.isecom.org/certification.html",
  "SC-300": "https://docs.microsoft.com/en-us/learn/certifications/identity-and-access-administrator/",
  "CSA CCSK": "https://cloudsecurityalliance.org/education/ccsk/",
  "C)CSO": "https://mile2.com/ccso_outline/",
  "DCA": "https://training.mirantis.com/dca-certification-exam/",
  "LPIC-1": "https://www.lpi.org/our-certifications/lpic-1-overview",
  "GICSP": "https://www.giac.org/certification/global-industrial-cyber-security-professional-gicsp",
  "GSEC": "https://www.giac.org/certification/security-essentials-gsec",
  "MOIS": "https://www.mosse-institute.com/certifications/mois-certified-osint-expert.html",
  "CFA": "https://gaqm.org/certifications/information_systems_security/cfa",
  "CSA": "https://www.eccouncil.org/programs/certified-soc-analyst-csa/",
  "GFACT": "https://www.giac.org/certifications/foundational-cybersecurity-technologies-gfact/",
  "SOG CMPen And": "https://secops.group/product/certified-mobile-pentester-cmpen-android/",
  "SOG CMPen iOS": "https://secops.group/product/certified-mobile-pentester-cmpen-ios/",
  "DV MoS": "https://0xdarkvortex.dev/training-programs/malware-on-steroids/#certification",
  "Pentest+": "https://www.comptia.org/certifications/pentest",
  "CREST CSAS": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-simulated-attack-specialist",
  "ECES": "https://www.eccouncil.org/programs/ec-council-certified-encryption-specialist-eces/",
  "JNCIA Sec": "https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jnciasec",
  "FCA": "https://training.fortinet.com/local/staticpage/view.php?page=fca_cybersecurity",
  "WCNA": "https://www.wcnacertification.com/exam-information-1",
  "Server+": "https://www.comptia.org/certifications/server",
  "PDSO CDP": "https://www.practical-devsecops.com/certified-devsecops-professional/",
  "EXIN PCD": "https://www.exin.com/certifications/ccc-professional-cloud-developer-exam",
  "KCNA": "https://www.cncf.io/certification/kcna/",
  "Linux+": "https://www.comptia.org/certifications/linux",
  "AZ-220": "https://docs.microsoft.com/en-us/learn/certifications/azure-iot-developer-specialty?wt.mc_id=learningredirect_certs-web-wwl",
  "CRFS": "https://www.identitymanagementinstitute.org/crfs/",
  "SSCP": "https://www.isc2.org/Certifications/SSCP",
  "SOG CAP": "https://secops.group/product/certified-application-security-practitioner/",
  "CCOA": "https://www.isaca.org/credentialing/ccoa",
  "CREST CPIA": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-practitioner-intrusion-analyst",
  "MESE": "https://www.mosse-institute.com/certifications/mese-certified-enterprise-security-engineer.html",
  "CREST CPTIA": "https://www.crest-approved.org/certification-careers/crest-certifications/crest-practitioner-threat-intelligence-analyst/",
  "MCPT": "https://www.mosse-institute.com/certifications/mcpt-cloud-penetration-tester.html",
  "C)PEH": "https://mile2.com/professional-ethical-hacker/",
  "GCPEH": "https://gaqm.org/certifications/information_systems_security/cpeh",
  "ITS-NS": "https://certiport.filecamp.com/s/ITS_OD_102_Network_Security/fi",
  "CCT": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/entry/technician-cct.html",
  "Cloud+": "https://www.comptia.org/certifications/cloud",
  "Google ACE": "https://cloud.google.com/certification/cloud-engineer",
  "SOG CCSP-AWS": "https://secops.group/product/certified-cloud-security-practitioner-aws-ccsp-aws/",
  "LFCA": "https://training.linuxfoundation.org/certification/certified-it-associate/",
  "ISA CFS": "https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/",
  "EITCA/IS": "https://eitca.org/eitca-is-information-security-academy/",
  "CIPP": "https://iapp.org/certify/cipp",
  "Security+": "https://www.comptia.org/certifications/security",
  "ECSS": "https://www.eccouncil.org/programs/certified-security-specialist-ecss/",
  "C)DFE": "https://www.mile2.com/cdfe_outline/",
  "S-SA": "https://www.seco-institute.org/get-trained/cyber-defense-track/associate-soc-analyst-certification/",
  "DV AOPH": "https://0xdarkvortex.dev/training-programs/adversary-operations-and-proactive-hunting/",
  "SOG NSP": "https://secops.group/product/certified-network-security-practitioner/",
  "Net+": "https://www.comptia.org/certifications/network",
  "CAMS": "https://www.identitymanagementinstitute.org/cams/",
  "AZ-900": "https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals",
  "MCSF": "https://www.mosse-institute.com/certifications/mcsf-cloud-services-fundamentals.html",
  "MSAF": "https://www.mosse-institute.com/certifications/msaf-system-administration-fundamentals.html",
  "Apple ACSP": "https://training.apple.com/us/en/recognition",
  "CACS": "https://www.exidacace.com/Apply/CACS",
  "TUV COSTE": "https://limessecurity.com/en/academy/ics-211/",
  "EPDPF": "https://www.exin.com/certifications/exin-privacy-and-data-protection-foundation-exam",
  "TOGAF Fdn": "https://www.opengroup.org/certifications/togaf",
  "CSP": "https://gaqm.org/certifications/scrum_agile/csp-410",
  "IIBA CCA": "https://www.iiba.org/certification/iiba-certifications/specialized-business-analysis-certifications/certificate-in-cybersecurity-analysis/",
  "CITGP": "https://www.itgovernance.co.uk/shop/product/implementing-it-governance-foundation-principles-training-course",
  "C)ISCAP": "https://www.mile2.com/iscap_outline/",
  "CSAP": "https://app.infosecinstitute.com/portal/courses/a0t0y000009lTzjAAE",
  "PECB 27032F": "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27032/iso-iec-27032-foundation",
  "MCL": "https://www.mosse-institute.com/certifications/mcl-cybersecurity-leadership.html",
  "ITS-C": "https://certiport.filecamp.com/s/JTIy1sX0ci0ZI3ss/fi",
  "EXIN CIT": "https://www.exin.com/qualification-program/exin-cyber-and-it-security",
  "TUV CySec": "https://www.tuv.com/landingpage/en/training-functional-safety-cyber-security/detail-pages/zertifikate/cs-specialist.html",
  "CSST": "https://gaqm.org/certifications/software_security_testing/csst",
  "OPSE": "https://www.isecom.org/certification.html",
  "CSX-F": "https://www.itgovernance.co.uk/shop/product/cyber-incident-response-management-foundation-training-course",
  "DV MILF": "https://0xdarkvortex.dev/training-programs/malware-incident-and-log-forensics/",
  "CIRM Fdn": "https://www.itgovernance.co.uk/shop/product/cyber-incident-response-management-foundation-training-course",
  "EEHF": "https://www.exin.com/certifications/exin-ethical-hacking-foundation-exam",
  "S-EHF": "https://www.seco-institute.org/certifications/ethical-hacking-certification-track/ethical-hacking-foundation/",
  "CHA": "https://www.isecom.org/certification.html",
  "FCF": "https://training.fortinet.com/local/staticpage/view.php?page=fcf_cybersecurity",
  "PCCET": "https://www.paloaltonetworks.com/services/education/certification",
  "AWS CP": "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  "EXIN PCA": "https://www.exin.com/certifications/ccc-professional-cloud-administrator-exam",
  "A+": "https://www.comptia.org/certifications/a",
  "CIOTSP": "https://certnexus.com/certification/ciotsp/",
  "TUV COSP": "https://limessecurity.com/en/academy/ics-201/",
  "EPDPE": "https://www.exin.com/certifications/exin-privacy-and-data-protection-essentials-exam",
  "M_o_R Fdn": "https://www.axelos.com/certifications/propath/mor-risk-management/mor-foundation",
  "Fair Fdn": "https://risklens-academy.myshopify.com/collections/popular-courses/products/fair-analysis-fundamentals-2",
  "PSM I": "https://www.scrum.org/assessments/professional-scrum-master-i-certification",
  "APMG 20000F": "https://apmg-international.com/product/iso-20000",
  "ISMI CSM": "https://www.ismi.org.uk/csmp/certified-security-manager%C2%AE",
  "BCS FISMP": "https://www.bcs.org/get-qualified/certifications-for-professionals/information-security-and-ccp-scheme-certifications/bcs-foundation-certificate-in-information-security-management-principles/",
  "CC": "https://www.isc2.org/Certifications/CC",
  "S-ISF": "https://www.seco-institute.org/certifications/information-security-certification-track/",
  "GISF": "https://www.giac.org/certification/information-security-fundamentals-gisf",
  "TUV CyAware": "https://www.is-its.org/seminare/isits-seminarangebot/cybersecurity-awareness-beauftragter",
  "MASE": "https://www.mosse-institute.com/certifications/mase-certified-application-security-engineer.html",
  "C)SP": "https://www.mile2.com/csp_outline/",
  "CND": "https://www.eccouncil.org/programs/certified-network-defender-cnd/",
  "C)VA": "https://www.mile2.com/vulnerability-assessor-outline/",
  "KLCP": "https://kali.training/klcp/",
  "SC-900": "https://docs.microsoft.com/en-us/learn/certifications/security-compliance-and-identity-fundamentals/",
  "Cloud Essnt": "https://www.comptia.org/certifications/cloud-essentials",
  "ITIL Fdn": "https://www.axelos.com/certifications/itil-certifications/itil-foundation",
  "Project+": "https://www.comptia.org/certifications/project",
  "CIISec ICSF": "https://www.ciisec.org/ICSF_Exam",
  "FEXIN": "https://www.exin.com/certifications/information-security-foundation-based-iso-iec-27001-exam?language_content_entity=en",
  "EXIN 27001F": "https://www.exin.com/certifications/information-security-foundation-based-iso-iec-27001-exam",
  "PECB 27005F": "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-iec-27005-foundation",
  "C CS F": "https://www.itgovernance.co.uk/shop/product/certified-cyber-security-foundation-training-course",
  "CIS F": "https://www.itgovernance.co.uk/shop/product/certified-iso-27001-isms-foundation-training-course",
  "S-SPF": "https://www.seco-institute.org/certifications/secure-software-certification-track/secure-programming-foundation/",
  "CSCU": "https://www.eccouncil.org/Certification/certified-secure-computer-user",
  "MICS": "https://www.mosse-institute.com/certifications/mics-introduction-to-cyber-security.html"
};

// Global Database Array
let certDatabase = [];

/**
 * 8 Primary CISSP / Paul Jerimy Security Domains
 */
const domainsMetadata = {
  "Communication & Network Security": {
    id: "communication-security",
    name: "Communication & Network Security",
    shortName: "Network Security",
    desc: "Borders, firewalls, routing protocols, perimeter defense, and secure transport infrastructure.",
    color: "#00e676",
    filename: "roadmap-communication-security.html",
    subtracks: ["Communication and Network Security"],
    vendors: ["Cisco", "Fortinet", "Juniper", "Palo Alto", "Check Point", "CompTIA", "GIAC", "Other"]
  },
  "Identity & Access Management (IAM)": {
    id: "iam",
    name: "Identity & Access Management (IAM)",
    shortName: "IAM",
    desc: "User authentication, directory services, access control design, credential lifecycles, and federation.",
    color: "#00e5ff",
    filename: "roadmap-iam.html",
    subtracks: ["IAM"],
    vendors: ["Microsoft", "ISACA", "ISC2", "Identity Management Institute", "Other"]
  },
  "Security Architecture & Engineering": {
    id: "architecture-engineering",
    name: "Security Architecture & Engineering",
    shortName: "Architecture & Engineering",
    desc: "System defense design, cloud virtualization, *nix OS infrastructure, and industrial OT/ICS systems.",
    color: "#ff9100",
    filename: "roadmap-architecture-engineering.html",
    subtracks: ["Cloud / SysOps", "Linux / Unix", "ICS/IoT"],
    vendors: ["AWS", "Microsoft", "Google", "Red Hat", "VMware", "Linux Foundation", "ISA", "TUV", "GIAC"]
  },
  "Asset Security": {
    id: "asset-security",
    name: "Asset Security",
    shortName: "Asset Security",
    desc: "Information classification, lifecycle protection, encryption at rest/transit, and hardware assurance.",
    color: "#ffd600",
    filename: "roadmap-asset-security.html",
    subtracks: ["Asset Security"],
    vendors: ["ISC2", "GIAC", "CompTIA", "SABSA", "Other"]
  },
  "Security & Risk Management": {
    id: "risk-management",
    name: "Security & Risk Management",
    shortName: "Risk Management & GRC",
    desc: "Enterprise risk modeling, ISMS compliance (ISO 27001), privacy governance, and legal audits.",
    color: "#b388ff",
    filename: "roadmap-risk-management.html",
    subtracks: ["GRC"],
    vendors: ["ISACA", "ISC2", "ISO/IEC", "PECB", "EXIN", "Axelos (ITIL)", "PMI", "GIAC", "Other"]
  },
  "Security Assessment & Testing": {
    id: "assessment-testing",
    name: "Security Assessment & Testing",
    shortName: "Assessment & Testing",
    desc: "Vulnerability analysis, security control verification, telemetry validation, and continuous auditing.",
    color: "#d500f9",
    filename: "roadmap-assessment-testing.html",
    subtracks: ["Security Assessment and Testing"],
    vendors: ["GIAC", "Microsoft", "CompTIA", "Other"]
  },
  "Software Security": {
    id: "software-security",
    name: "Software Security",
    shortName: "Software Security & AppSec",
    desc: "Secure coding practices, DevSecOps pipelines, static/dynamic code audits, and container hardening.",
    color: "#2979ff",
    filename: "roadmap-software-security.html",
    subtracks: ["Software Security"],
    vendors: ["ISC2", "EC-Council", "Practical DevSecOps", "GIAC", "SECO", "Other"]
  },
  "Security Operations (SOC / Blue & Red)": {
    id: "security-operations",
    name: "Security Operations (SOC / Blue & Red)",
    shortName: "Security Operations",
    desc: "Threat hunting, SOC operations, digital forensics, incident response, penetration testing, and exploitation.",
    color: "#ff1744",
    filename: "roadmap-security-operations.html",
    subtracks: ["Security Operations", "Incident Handling", "Forensics", "Penetration Testing", "Exploitation"],
    vendors: ["OffSec", "GIAC", "CREST", "Hack The Box", "EC-Council", "Security Blue Team", "TCM Security"]
  }
};

/**
 * 14 Matrix Columns Configuration
 */
const matrixColumnsConfig = [
  { title: "Comm & NetSec", domain: "Communication & Network Security", color: "#00e676", subtracks: ["Communication and Network Security"] },
  { title: "IAM", domain: "Identity & Access Management (IAM)", color: "#00e5ff", subtracks: ["IAM"] },
  { title: "Cloud / SysOps", domain: "Security Architecture & Engineering", color: "#ff9100", subtracks: ["Cloud / SysOps"] },
  { title: "*nix OS", domain: "Security Architecture & Engineering", color: "#ffab00", subtracks: ["Linux / Unix"] },
  { title: "ICS / IoT", domain: "Security Architecture & Engineering", color: "#ff6d00", subtracks: ["ICS/IoT"] },
  { title: "Asset Security", domain: "Asset Security", color: "#ffd600", subtracks: ["Asset Security"] },
  { title: "Risk & GRC", domain: "Security & Risk Management", color: "#b388ff", subtracks: ["GRC"] },
  { title: "Assessment", domain: "Security Assessment & Testing", color: "#d500f9", subtracks: ["Security Assessment and Testing"] },
  { title: "Software Sec", domain: "Software Security", color: "#2979ff", subtracks: ["Software Security"] },
  { title: "SecOps / Blue", domain: "Security Operations (SOC / Blue & Red)", color: "#ff1744", subtracks: ["Security Operations"] },
  { title: "Incident Resp", domain: "Security Operations (SOC / Blue & Red)", color: "#f50057", subtracks: ["Incident Handling"] },
  { title: "Forensics", domain: "Security Operations (SOC / Blue & Red)", color: "#d81b60", subtracks: ["Forensics"] },
  { title: "Pen Testing", domain: "Security Operations (SOC / Blue & Red)", color: "#c2185b", subtracks: ["Penetration Testing"] },
  { title: "Exploitation", domain: "Security Operations (SOC / Blue & Red)", color: "#880e4f", subtracks: ["Exploitation"] }
];

// Raw Certifications by 15 Tracks (481 Total)
const rawCertsByTrack = {
  "Communication and Network Security": {
    "expert": [
      "CCIE Sec",
      "CCIE Ent",
      "JNCIE Sec",
      "CCDE",
      "FCX",
      "CCNP Sec",
      "JNCIP Sec",
      "PCNSE",
      "FCSS ZTA",
      "FCSS SASE",
      "F5 CSE Sec",
      "CCNP Ent",
      "CCSM",
      "PCSAE",
      "PCCSE",
      "FCSS NS",
      "DevNet Pro",
      "JNCIS Sec"
    ],
    "intermediate": [
      "F5 CTS APM",
      "FCP NS",
      "CCNA",
      "F5 CTS DNS",
      "PCDRA",
      "DevNet A",
      "MNSE",
      "PCNSA",
      "OWSE",
      "JNCIA Sec",
      "FCA",
      "WCNA",
      "ITS-NS",
      "CCT"
    ],
    "beginner": [
      "SOG NSP",
      "Net+",
      "FCF",
      "PCCET"
    ]
  },
  "IAM": {
    "expert": [
      "CIMP",
      "CIAM",
      "CIDPRO",
      "CIPA"
    ],
    "intermediate": [
      "CIMP",
      "SF CIAMD",
      "CIGE",
      "CIST",
      "SC-300"
    ],
    "beginner": [
      "CAMS"
    ]
  },
  "Asset Security": {
    "expert": [
      "CREST CRTSA",
      "SABSA SCM",
      "GSE",
      "SC-100",
      "GDSA",
      "CASP+",
      "GMOB",
      "CCSP"
    ],
    "intermediate": [
      "EITCA/IS"
    ],
    "beginner": []
  },
  "Security Assessment and Testing": {
    "expert": [
      "GAWN",
      "GMON",
      "GCDA",
      "GPYC",
      "SC-400"
    ],
    "intermediate": [],
    "beginner": []
  },
  "Software Security": {
    "expert": [
      "GWEB",
      "S-CSPL",
      "PDSO CDE",
      "Scrum PSD",
      "CSSLP",
      "CASE",
      "GMLE"
    ],
    "intermediate": [
      "CASST",
      "CCSC",
      "C)SWAE",
      "SOG CAP"
    ],
    "beginner": [
      "CSST",
      "MASE",
      "C)SP",
      "S-SPF",
      "CSCU",
      "MICS"
    ]
  },
  "Security Operations": {
    "expert": [
      "CISSP",
      "GCIA",
      "C)DRE"
    ],
    "intermediate": [
      "CDP",
      "OSIP",
      "CySA+",
      "CSX-P",
      "OPSA",
      "GSEC",
      "SSCP",
      "Security+",
      "ECSS"
    ],
    "beginner": [
      "CC",
      "SC-900"
    ]
  },
  "Cloud / SysOps": {
    "expert": [
      "VCDX DCV",
      "VCIX DCV",
      "AWS SAP",
      "AZ-305",
      "VCIX NV",
      "Google PCSA",
      "FCSS PCS",
      "MS-100",
      "GPCS",
      "GCSA",
      "GCWN",
      "VCP DCV",
      "CKS",
      "FCP PCS",
      "SFCTA",
      "CCSE",
      "AWS CSS",
      "SFCCCC",
      "EXIN PCSA",
      "CKA"
    ],
    "intermediate": [
      "AZ-500",
      "CSA CGC",
      "VCP NV",
      "CKAD",
      "GCLD",
      "AWS SAA",
      "EXIN PCSerM",
      "AZ-104",
      "CLCSM",
      "CCSE",
      "MCSE",
      "SFSA",
      "Google PCSE",
      "EXIN PCSM",
      "MDSO",
      "CSA CCSK",
      "C)CSO",
      "PDSO CDP",
      "EXIN PCD",
      "KCNA",
      "Cloud+",
      "Google ACE",
      "SOG CCSP-AWS"
    ],
    "beginner": [
      "AZ-900",
      "MCSF",
      "AWS CP",
      "EXIN PCA",
      "A+",
      "Cloud Essnt"
    ]
  },
  "Linux / Unix": {
    "expert": [
      "RHCA",
      "RHCE",
      "LPIC-3",
      "SCE",
      "LFCS",
      "RHCSA"
    ],
    "intermediate": [
      "LPIC-2",
      "SCA",
      "DCA",
      "LPIC-1",
      "Server+",
      "Linux+",
      "LFCA"
    ],
    "beginner": [
      "MSAF",
      "Apple ACSP"
    ]
  },
  "ICS/IoT": {
    "expert": [
      "ISA CE",
      "CACE",
      "GRID",
      "FCSS OT",
      "CSSA",
      "ISA CDS",
      "TUV COTCP"
    ],
    "intermediate": [
      "GCIP",
      "ISA CRAS",
      "SPLK-3001",
      "ISA CAP",
      "TUV COSM",
      "GICSP",
      "AZ-220",
      "ISA CFS"
    ],
    "beginner": [
      "CACS",
      "TUV COSTE",
      "CIOTSP",
      "TUV COSP"
    ]
  },
  "GRC": {
    "expert": [
      "ITIL Master",
      "PgMP",
      "CISSP Concentrations",
      "NCSC CCPLP",
      "ASIS CPP",
      "Zach EAPro",
      "PMP",
      "CISM",
      "S-ISME",
      "NCSC CCPSP",
      "TOGAF",
      "CCISO",
      "EEXIN ISM",
      "GSTRT",
      "NCSC CCPP",
      "GSNA",
      "SABSA SCP",
      "PSM III",
      "GSP",
      "GISP",
      "ITIL SL",
      "Zach EAP",
      "GSLC",
      "S-CISO",
      "ITIL MP",
      "Scrum SPS",
      "GLEG",
      "CISSM",
      "CGRC",
      "CRISC",
      "GCCC",
      "PCI QSA",
      "CIS LI",
      "CIPT",
      "CDPSE",
      "CSM",
      "CASM",
      "CM)ISSO",
      "S-ISP",
      "CISA",
      "CIS LA",
      "GCPM",
      "BCS PCIRM",
      "PEXIN ISM",
      "MGRC",
      "EPDPP",
      "M_o_R P",
      "CPD",
      "PMI ACP",
      "EISM",
      "CGEIT",
      "EXIN 27001E",
      "PECB 27005LM",
      "DCCRP",
      "CTPRA",
      "PECB 27001LA",
      "SABSA SCF",
      "DCPP",
      "Scrum PAL",
      "CAPM",
      "PSM II",
      "APMG 20000P",
      "C)ISRM",
      "APMG 27001P",
      "PECB 27001LI",
      "IS20",
      "C)ISSA",
      "APMG 27001A"
    ],
    "intermediate": [
      "CCP",
      "C)ISSO",
      "CIS RM",
      "EXIN 27001P",
      "PECB 27032CM",
      "C)HISSP",
      "APMG 20000A",
      "C)ISMS-LA",
      "CIS IA",
      "BCS PCIAA",
      "CCSA",
      "PPM",
      "C)ISSM",
      "TUV ITSM",
      "CCRMP",
      "PECB 27005RM",
      "CSBA",
      "DCBCLA",
      "TUV MSA",
      "ASIS APP",
      "DACRP",
      "CISRM",
      "DCRMP",
      "SSAP",
      "GRCP",
      "SACP",
      "CISP",
      "TUV Auditor",
      "CTPRP",
      "IIA CIA",
      "Zach EAA",
      "CAD",
      "CAC",
      "ISMI CSMP",
      "CSCS",
      "APMG 27001F",
      "PECB 27001F",
      "C)SLO",
      "DCBCA",
      "GRCA",
      "CISST",
      "ASIS PCI",
      "CRFS",
      "CCOA",
      "CCSA",
      "CIPP"
    ],
    "beginner": [
      "EPDPF",
      "TOGAF Fdn",
      "CSP",
      "IIBA CCA",
      "CITGP",
      "C)ISCAP",
      "CSAP",
      "PECB 27032F",
      "MCL",
      "ITS-C",
      "EXIN CIT",
      "TUV CySec",
      "EPDPE",
      "M_o_R Fdn",
      "Fair Fdn",
      "PSM I",
      "APMG 20000F",
      "ISMI CSM",
      "BCS FISMP",
      "S-ISF",
      "GISF",
      "TUV CyAware",
      "ITIL Fdn",
      "Project+",
      "CIISec ICSF",
      "FEXIN",
      "EXIN 27001F",
      "PECB 27005F",
      "C CS F",
      "CIS F"
    ]
  },
  "Forensics": {
    "expert": [
      "GREM",
      "CFCE",
      "CSFA",
      "GIME",
      "CAWFE",
      "GCFA",
      "CFSR",
      "GNFA",
      "MTIA",
      "GCFR",
      "BTL2",
      "GCFE",
      "GASF",
      "CCFE",
      "CMFE",
      "GX-FA",
      "CDRP",
      "eCDFP",
      "MDFIR",
      "CCE",
      "CM)DFI",
      "GBFA",
      "EnCE",
      "ACE"
    ],
    "intermediate": [
      "CHFI",
      "C)NFE",
      "MOIS",
      "CFA",
      "C)DFE"
    ],
    "beginner": [
      "DV MILF"
    ]
  },
  "Incident Handling": {
    "expert": [
      "CCD",
      "GCTI",
      "CREST CSAM",
      "GDAT",
      "GEIR",
      "eCTHP",
      "GCTD",
      "Cisco COP",
      "GCED",
      "MCPE",
      "CREST CCTIM",
      "GCIH",
      "FCSS SO",
      "MTH",
      "FCP SO",
      "CREST CRIA",
      "CREST CRTIA",
      "GSOC",
      "BTL1",
      "MBT",
      "MPT",
      "CREST CCHIA",
      "eCIR",
      "C)IHE"
    ],
    "intermediate": [
      "Cisco COA",
      "C)CSA",
      "S-TA",
      "ECIH",
      "GOSI",
      "C)TIA",
      "OSDA",
      "CWSP",
      "CREST CCNIA",
      "SC-200",
      "MRCI",
      "EDRP",
      "HTB CDSA",
      "CFR",
      "CTIA",
      "F5 CA",
      "eNDP",
      "MAD SOCA",
      "MAD CTI",
      "CSA",
      "GFACT",
      "CREST CPIA",
      "MESE",
      "CREST CPTIA",
      "S-SA",
      "DV AOPH"
    ],
    "beginner": [
      "OPSE",
      "CSX-F",
      "CIRM Fdn",
      "CND"
    ]
  },
  "Penetration Testing": {
    "expert": [
      "eWPTX",
      "CREST CCSAS",
      "MRT",
      "CREST CCTINF",
      "S-CEHL",
      "CREST CRT",
      "S-EHE",
      "OSCP",
      "GX-PT",
      "GPEN",
      "OSWP",
      "LPT",
      "PNPT",
      "GCPN",
      "SOG CAPenX",
      "GWAPT",
      "GCPT",
      "CCPenX-AWS",
      "CPENT",
      "CREST CCTAPP",
      "HTB CPTS",
      "CSTL",
      "eCPPT",
      "eWPT",
      "CM)IPS",
      "HTB CBBH"
    ],
    "intermediate": [
      "C)PSH",
      "CMWAPT",
      "C)PTC",
      "eMAPT",
      "BSCP",
      "OPST",
      "OSWA",
      "CNDA",
      "CSTM",
      "eJPT",
      "S-EHP",
      "CHAT",
      "CREST CPSA",
      "CEH",
      "SOG CAPen",
      "C)PTE",
      "SOG CNPen",
      "SOG CMPen And",
      "SOG CMPen iOS",
      "Pentest+",
      "CREST CSAS",
      "MCPT",
      "C)PEH",
      "GCPEH"
    ],
    "beginner": [
      "EEHF",
      "S-EHF",
      "CHA",
      "C)VA",
      "KLCP"
    ]
  },
  "Exploitation": {
    "expert": [
      "OSEE",
      "OSCE3",
      "OSWE",
      "OSEP",
      "OSED",
      "GXPN",
      "HTB CWEE",
      "PACES",
      "CRTO II",
      "MCD",
      "CRTO",
      "GRTP",
      "OSMR",
      "MRE",
      "PJMR"
    ],
    "intermediate": [
      "CRTOP",
      "CSR",
      "CREA",
      "CSAE",
      "DV RTOS",
      "DV OTD",
      "MVRE",
      "DV MoS",
      "ECES"
    ],
    "beginner": []
  }
};

// Map certification issuer vendor
function getVendorForCert(name) {
  const n = name.toUpperCase().trim();
  if (n.startsWith("AWS") || n === "AWS CP" || n === "AWS SAA" || n === "AWS SAP") return "AWS";
  if (n.startsWith("AZ-") || n.startsWith("SC-") || n.startsWith("MS-") || n.includes("AZURE") || n.includes("MICROSOFT")) return "Microsoft";
  if (n.startsWith("CCNA") || n.startsWith("CCNP") || n.startsWith("CCIE") || n.startsWith("CCT") || n.startsWith("CCDE") || n.startsWith("CISCO") || n.startsWith("DEVNET")) return "Cisco";
  if (n.startsWith("JNCIA") || n.startsWith("JNCIS") || n.startsWith("JNCIP") || n.startsWith("JNCIE") || n.includes("JUNIPER")) return "Juniper";
  if (n.startsWith("FCA") || n.startsWith("FCF") || n.startsWith("FCP") || n.startsWith("FCSS") || n.startsWith("FCX") || n.includes("FORTINET")) return "Fortinet";
  if (n.startsWith("PCN") || n.startsWith("PCC") || n.startsWith("PCDRA") || n.includes("PALO ALTO")) return "Palo Alto";
  if (n.startsWith("G") && (n.length <= 5 || n.startsWith("GSEC") || n.startsWith("GCIA") || n.startsWith("GCIH") || n.startsWith("GCFA") || n.startsWith("GXPN") || n.startsWith("GREM") || n.startsWith("GISF") || n.startsWith("GDSA") || n.startsWith("GPEN") || n.startsWith("GWAPT") || n.startsWith("GCFE") || n.startsWith("GNFA") || n.startsWith("GICSP") || n.startsWith("GCDA") || n.startsWith("GOSI") || n.startsWith("GASF") || n.startsWith("GCTD") || n.startsWith("GSTRT") || n.startsWith("GSLC") || n.startsWith("GSSP") || n.startsWith("GWEB") || n.startsWith("GRID") || n.startsWith("GMOB") || n.startsWith("GCPM") || n.startsWith("GPYC") || n.startsWith("GMLE"))) return "GIAC";
  if (n.startsWith("EJPT") || n.startsWith("ECPPT") || n.startsWith("EWPT") || n.startsWith("ECIR") || n.startsWith("EMAPT") || n.startsWith("ENDP") || n.startsWith("ECTHP") || n.startsWith("ECDFP")) return "eLearnSecurity";
  if (n.startsWith("OSCP") || n.startsWith("OSEP") || n.startsWith("OSWE") || n.startsWith("OSED") || n.startsWith("OSCE") || n.startsWith("OSEE") || n.startsWith("OSWP") || n.startsWith("OSMR") || n.startsWith("OSIP") || n.startsWith("OSDA") || n.startsWith("OSWA")) return "OffSec";
  if (n.includes("SECURITY+") || n.includes("NETWORK+") || n.includes("A+") || n.includes("LINUX+") || n.includes("PENTEST+") || n.includes("CYSA+") || n.includes("CASP+") || n.includes("SERVER+") || n.includes("PROJECT+") || n.includes("CLOUD+") || n === "NET+" || n === "SEC+") return "CompTIA";
  if (n.includes("CISSP") || n.includes("CCSP") || n.includes("CSSLP") || n.includes("SSCP") || n === "CC" || n === "CGRC") return "ISC2";
  if (n.includes("CISM") || n.includes("CISA") || n.includes("CRISC") || n.includes("CGEIT") || n.includes("CDPSE") || n.includes("CSX") || n === "CCOA") return "ISACA";
  if (n.startsWith("HTB")) return "Hack The Box";
  if (n.startsWith("CREST")) return "CREST";
  if (n.startsWith("CEH") || n.startsWith("CHFI") || n.startsWith("ECIH") || n.startsWith("CSA") || n.startsWith("CFR") || n.startsWith("ECES") || n.startsWith("EISM") || n.startsWith("EDRP") || n.startsWith("CPENT") || n.startsWith("LPT") || n.startsWith("CCISO") || n.startsWith("CSCU") || n.startsWith("CASE")) return "EC-Council";
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
  if (n.startsWith("TUV")) return "TUV";
  return "Other";
}

// Global Coordinates for vendor headquarters
const vendorHQs = {
  "AWS": { lat: 47.6062, lon: -122.3321, label: "AWS Security", desc: "Seattle, WA - Cloud Infrastructure" },
  "Microsoft": { lat: 47.6740, lon: -122.1215, label: "Microsoft Security", desc: "Redmond, WA - Enterprise Identity & Azure" },
  "Google": { lat: 37.4220, lon: -122.0841, label: "Google Cloud Security", desc: "Mountain View, CA - GCP Cyber Defense" },
  "Cisco": { lat: 37.3382, lon: -121.8863, label: "Cisco Systems", desc: "San Jose, CA - Communication & NetSec HQ" },
  "Juniper": { lat: 37.4037, lon: -122.0292, label: "Juniper Networks", desc: "Sunnyvale, CA - Enterprise Routing & Sec" },
  "Fortinet": { lat: 37.3688, lon: -122.0363, label: "Fortinet", desc: "Sunnyvale, CA - NextGen Firewall & NetSec" },
  "Palo Alto": { lat: 37.3541, lon: -121.9552, label: "Palo Alto Networks", desc: "Santa Clara, CA - Cloud & Firewall Command" },
  "OffSec": { lat: 32.7767, lon: -96.7970, label: "Offensive Security", desc: "Dallas, TX - Elite Exploitation & Pentesting" },
  "GIAC": { lat: 38.8951, lon: -77.0364, label: "GIAC / SANS", desc: "Washington, DC - Global Cyber Assurance" },
  "ISC2": { lat: 28.0339, lon: -82.6841, label: "(ISC)² HQ", desc: "Clearwater, FL - CISSP & Cyber Standards" },
  "ISACA": { lat: 42.0334, lon: -87.9806, label: "ISACA HQ", desc: "Schaumburg, IL - GRC, CISM & Audit Systems" },
  "EC-Council": { lat: 35.0844, lon: -106.6504, label: "EC-Council", desc: "Albuquerque, NM - CEH & Incident Response" },
  "Hack The Box": { lat: 37.9838, lon: 23.7275, label: "Hack The Box", desc: "Athens, Greece - Cyber Range & Pentesting" },
  "Security Blue Team": { lat: 51.5074, lon: -0.1278, label: "Security Blue Team", desc: "London, UK - BTL1 & Defensive Operations" },
  "TCM Security": { lat: 34.0522, lon: -118.2437, label: "TCM Security", desc: "Los Angeles, CA - PNPT & Practical Pentesting" },
  "Red Hat": { lat: 35.7796, lon: -78.6382, label: "Red Hat HQ", desc: "Raleigh, NC - Linux Enterprise Security" },
  "VMware": { lat: 37.4419, lon: -122.1430, label: "VMware", desc: "Palo Alto, CA - Virtualization & Data Center" },
  "Check Point": { lat: 32.0853, lon: 34.7818, label: "Check Point Software", desc: "Tel Aviv, Israel - NextGen Threat Prevention" },
  "SABSA": { lat: 51.5074, lon: -0.1278, label: "SABSA Institute", desc: "London, UK - Enterprise Security Architecture" },
  "The Open Group": { lat: 42.3601, lon: -71.0589, label: "The Open Group", desc: "Boston, MA - TOGAF Enterprise Frameworks" },
  "Axelos (ITIL)": { lat: 51.5074, lon: -0.1278, label: "Axelos / PeopleCert", desc: "London, UK - ITIL Service Governance" },
  "Linux Foundation": { lat: 37.7749, lon: -122.4194, label: "Linux Foundation", desc: "San Francisco, CA - Open Source Cloud & Kernel" },
  "ISA": { lat: 35.9132, lon: -79.0558, label: "ISA Automation", desc: "Research Triangle Park, NC - Industrial ICS/OT" },
  "PECB": { lat: 45.5017, lon: -73.5673, label: "PECB International", desc: "Montreal, Canada - ISO 27001/27005 Certification" },
  "EXIN": { lat: 52.0907, lon: 5.1214, label: "EXIN Global", desc: "Utrecht, Netherlands - IT & Privacy Standards" },
  "TUV": { lat: 50.9375, lon: 6.9603, label: "TÜV Rheinland", desc: "Cologne, Germany - Industrial Functional Safety" },
  "CREST": { lat: 51.5074, lon: -0.1278, label: "CREST Approved", desc: "London, UK - Technical Cyber Assurance" },
  "Other": { lat: 37.7749, lon: -122.4194, label: "Global Cyber Command", desc: "International Certification Node" }
};

// Build Global Database of all 481 certs
function buildCertDatabase() {
  const db = [];
  
  Object.keys(rawCertsByTrack).forEach(trackName => {
    let domainName = "Security Operations (SOC / Blue & Red)";
    Object.keys(domainsMetadata).forEach(dom => {
      if (domainsMetadata[dom].subtracks.includes(trackName)) {
        domainName = dom;
      }
    });

    ["expert", "intermediate", "beginner"].forEach(level => {
      const list = rawCertsByTrack[trackName][level] || [];
      list.forEach(certName => {
        const trimmed = certName.trim();
        if (trimmed) {
          db.push({
            name: trimmed,
            level: level,
            track: trackName,
            domain: domainName,
            vendor: getVendorForCert(trimmed)
          });
        }
      });
    });
  });

  return db;
}

certDatabase = buildCertDatabase();

const majorCertsDetails = {
  "CISSP": {
    fullName: "Certified Information Systems Security Professional",
    issuer: "(ISC)2",
    examFormat: "Computerized Adaptive Testing (CAT)",
    estPrep: "3 to 6 months",
    description: "Premier cybersecurity management credential validating comprehensive information security governance, risk management, and security architecture expertise."
  },
  "CCNA": {
    fullName: "Cisco Certified Network Associate",
    issuer: "Cisco Systems",
    examFormat: "Multiple Choice & Simulation",
    estPrep: "2 to 3 months",
    description: "Covers network fundamentals, IP connectivity, IP services, security fundamentals, automation, and programmability."
  },
  "CEH": {
    fullName: "Certified Ethical Hacker",
    issuer: "EC-Council",
    examFormat: "Multiple Choice & Scenario-based Practical",
    estPrep: "2 to 3 months",
    description: "Validates core ethical hacking methodologies, system scanning, vulnerability analysis, and penetration testing frameworks."
  },
  "OSCP": {
    fullName: "Offensive Security Certified Professional",
    issuer: "OffSec",
    examFormat: "24-Hour Practical Pentesting Exam",
    estPrep: "3 to 6 months",
    description: "Industry-standard offensive credential verifying direct capability in network hacking, system exploitation, and custom payload writing."
  },
  "CSSA": {
    fullName: "Certified SCADA Security Architect",
    issuer: "IACRB / InfoSec Institute",
    examFormat: "Multiple Choice & Scenario-based Practical",
    estPrep: "2 to 3 months",
    description: "Specialized industrial control systems credential validating security architecture, hardening, and resilience in SCADA/ICS environments."
  },
  "SECURITY+": {
    fullName: "CompTIA Security+",
    issuer: "CompTIA",
    examFormat: "Multiple Choice & Performance-Based Questions (PBQs)",
    estPrep: "1 to 2 months",
    description: "Foundational baseline certification validating core cybersecurity principles, threat intelligence, and hands-on risk mitigation."
  },
  "NETWORK+": {
    fullName: "CompTIA Network+",
    issuer: "CompTIA",
    examFormat: "Multiple Choice & PBQs",
    estPrep: "1 to 2 months",
    description: "Establishes foundational skills in system networking, IP addressing, routing protocols, and basic infrastructure defense."
  },
  "CISA": {
    fullName: "Certified Information Systems Auditor",
    issuer: "ISACA",
    examFormat: "Multiple Choice",
    estPrep: "2 to 4 months",
    description: "Industry-standard standard for audit control, assurance, and security governance of enterprise information systems."
  },
  "CISM": {
    fullName: "Certified Information Security Manager",
    issuer: "ISACA",
    examFormat: "Multiple Choice",
    estPrep: "2 to 4 months",
    description: "Validates security management proficiency, incident handling governance, risk compliance, and program development."
  },
  "CYSA+": {
    fullName: "CompTIA Cybersecurity Analyst",
    issuer: "CompTIA",
    examFormat: "Multiple Choice & PBQs",
    estPrep: "2 to 3 months",
    description: "Focuses on threat management, vulnerability assessment, security operations monitoring, and incident response operations."
  },
  "PENTEST+": {
    fullName: "CompTIA PenTest+",
    issuer: "CompTIA",
    examFormat: "Multiple Choice & PBQs",
    estPrep: "2 to 3 months",
    description: "Validates penetration testing planning, vulnerability scanning, system exploitation, and post-exploit reporting workflows."
  },
  "BTL1": {
    fullName: "Blue Team Level 1",
    issuer: "Security Blue Team",
    examFormat: "24-Hour Practical Incident Response Exam",
    estPrep: "2 to 3 months",
    description: "Demonstrates practical defensive capability across security operations, phishing analysis, digital forensics, and SIEM monitoring."
  },
  "CRTO": {
    fullName: "Certified Red Team Operator",
    issuer: "Zero Point Security",
    examFormat: "48-Hour Practical Red Teaming Exam",
    estPrep: "2 to 3 months",
    description: "Validates capabilities in active directory exploitation, evasion techniques, payload delivery, and adversary simulation."
  },
  "AWS CSS": {
    fullName: "AWS Certified Security - Specialty",
    issuer: "Amazon Web Services",
    examFormat: "Multiple Choice & Multiple Response",
    estPrep: "2 to 3 months",
    description: "Validates advanced cloud security design, data protection controls, infrastructure monitoring, and threat detection on AWS."
  },
  "AZ-500": {
    fullName: "Microsoft Certified: Azure Security Engineer Associate",
    issuer: "Microsoft",
    examFormat: "Multiple Choice & Lab Exercises",
    estPrep: "1 to 2 months",
    description: "Covers security controls, threat protection, identity and access management, and database protection inside Azure Cloud."
  },
  "SC-100": {
    fullName: "Microsoft Certified: Cybersecurity Architect Expert",
    issuer: "Microsoft",
    examFormat: "Multiple Choice & Case Studies",
    estPrep: "2 to 3 months",
    description: "Validates expert capabilities in designing Zero Trust architectures, cloud asset protection, GRC strategies, and SOC integration."
  },
  "PNPT": {
    fullName: "Practical Network Penetration Tester",
    issuer: "TCM Security",
    examFormat: "5-Day Practical Exam & 15-Min Live Briefing",
    estPrep: "2 to 4 months",
    description: "Validates realistic external/internal pentesting methodologies, OSINT strategies, and active directory exploitation."
  },
  "GSEC": {
    fullName: "GIAC Security Essentials",
    issuer: "GIAC / SANS",
    examFormat: "Multiple Choice (Proctored)",
    estPrep: "2 to 3 months",
    description: "Establishes a solid base in active defense controls, network configuration security, cryptography, and risk handling."
  },
  "GPEN": {
    fullName: "GIAC Certified Penetration Tester",
    issuer: "GIAC / SANS",
    examFormat: "Multiple Choice & Lab Questions",
    estPrep: "3 to 4 months",
    description: "Validates methodologies in network penetration testing, exploitation techniques, and post-exploitation target analysis."
  },
  "GCIH": {
    fullName: "GIAC Certified Incident Handler",
    issuer: "GIAC / SANS",
    examFormat: "Multiple Choice & CyberLive Labs",
    estPrep: "3 to 4 months",
    description: "Validates technical understanding of common vectors of attack, exploit mitigation, incident handling steps, and digital forensics."
  },
  "GCFA": {
    fullName: "GIAC Certified Forensic Analyst",
    issuer: "GIAC / SANS",
    examFormat: "Multiple Choice & CyberLive Labs",
    estPrep: "3 to 4 months",
    description: "Demonstrates expert proficiency in host forensics, memory analysis, incident response, and advanced threat hunting."
  },
  "GREM": {
    fullName: "GIAC Reverse Engineering Malware",
    issuer: "GIAC / SANS",
    examFormat: "Multiple Choice & CyberLive Labs",
    estPrep: "4 to 6 months",
    description: "Elite certification validating capabilities in static and dynamic analysis of malware samples targeting enterprise systems."
  },
  "GXPN": {
    fullName: "GIAC Exploit Researcher and Advanced Penetration Tester",
    issuer: "GIAC / SANS",
    examFormat: "Multiple Choice & CyberLive Labs",
    estPrep: "4 to 6 months",
    description: "Elite credential validating advanced exploitation, bypass techniques, memory corruption analysis, and custom tool engineering."
  },
  "ISO 27001 LA": {
    fullName: "ISO/IEC 27001 Lead Auditor",
    issuer: "ISO/IEC / PECB",
    examFormat: "Written Essay / Scenario Audit",
    estPrep: "1 to 2 months",
    description: "Validates technical audit competence in planning, conducting, and reporting ISMS compliance reviews based on ISO 27001 standards."
  },
  "ISO 27001 LI": {
    fullName: "ISO/IEC 27001 Lead Implementer",
    issuer: "ISO/IEC / PECB",
    examFormat: "Written Essay / Scenario Design",
    estPrep: "1 to 2 months",
    description: "Confirms capacity to implement, manage, and scale an Information Security Management System (ISMS) in compliance with ISO 27001."
  }
};

// Detail dossiers getter
function getCertDetails(name, level, domain) {
  let issuer = getVendorForCert(name);
  if (issuer === "Other") issuer = "Global Cybersecurity Council";
  
  const levelTitle = level.toUpperCase();
  const prep = level === "beginner" ? "2 to 4 weeks" : level === "intermediate" ? "1 to 2 months" : "3 to 6 months";

  // Normalize key lookup
  const keyMap = {
    "SEC+": "SECURITY+",
    "NET+": "NETWORK+",
    "SECURITY +": "SECURITY+",
    "NETWORK +": "NETWORK+",
    "ISO27001 LA": "ISO 27001 LA",
    "ISO27001 LI": "ISO 27001 LI"
  };
  
  let searchKey = name.toUpperCase().trim();
  if (keyMap[searchKey]) {
    searchKey = keyMap[searchKey];
  }
  
  if (majorCertsDetails[searchKey]) {
    const rich = majorCertsDetails[searchKey];
    return {
      name: name,
      fullName: rich.fullName,
      issuer: rich.issuer || issuer,
      examFormat: rich.examFormat,
      estPrep: rich.estPrep,
      description: rich.description,
      level: level,
      domain: domain
    };
  }

  return {
    name: name,
    fullName: `${name} Cybersecurity Certification`,
    issuer: issuer,
    examFormat: level === "beginner" ? "Multiple Choice Theory" : "Practical Hands-on & Scenario Auditing",
    estPrep: prep,
    description: `This validation node forms part of the ${domain} domain track at the ${levelTitle} tier. Designed to validate professional readiness, enterprise compliance, and technical proficiency.`,
    level: level,
    domain: domain
  };
}

/**
 * MAIN ROADMAP INITIALIZER (Level 1 + Interactive Matrix)
 */
function initMainRoadmap() {
  // Update stats
  const statTotal = document.getElementById("statTotal");
  if (statTotal) statTotal.textContent = certDatabase.length;
  const statBeg = document.getElementById("statBeginner");
  if (statBeg) statBeg.textContent = certDatabase.filter(c => c.level === "beginner").length;
  const statInt = document.getElementById("statIntermediate");
  if (statInt) statInt.textContent = certDatabase.filter(c => c.level === "intermediate").length;
  const statExp = document.getElementById("statExpert");
  if (statExp) statExp.textContent = certDatabase.filter(c => c.level === "expert").length;

  // Render Matrix
  renderFullRoadmapMatrix();

  // Setup Drag to Scroll
  setupMatrixDragScroll();

  // Render Domain Cards
  renderDomainDashboardCards();

  // Setup Search Input Filter
  const domainSearchInput = document.getElementById("domainSearchInput");
  if (domainSearchInput) {
    domainSearchInput.addEventListener("input", () => {
      const q = domainSearchInput.value.toLowerCase().trim();
      filterRoadmapSearch(q);
    });
  }

  // Telemetry Cards Interactive Click Filter / Sort
  const telemetryCards = document.querySelectorAll(".hud-telemetry-panel .telemetry-card");
  function syncTelemetryActiveState(sortMode) {
    telemetryCards.forEach(c => c.classList.remove("active"));
    if (sortMode === "l1-desc" || sortMode === "beginner-first") {
      const c = document.querySelector(".hud-telemetry-panel .telemetry-card.beginner");
      if (c) c.classList.add("active");
    } else if (sortMode === "l2-desc") {
      const c = document.querySelector(".hud-telemetry-panel .telemetry-card.intermediate");
      if (c) c.classList.add("active");
    } else if (sortMode === "l3-desc" || sortMode === "expert-first") {
      const c = document.querySelector(".hud-telemetry-panel .telemetry-card.expert");
      if (c) c.classList.add("active");
    } else if (sortMode === "total-desc") {
      const c = document.querySelector(".hud-telemetry-panel .telemetry-card.total");
      if (c) c.classList.add("active");
    }
  }

  telemetryCards.forEach(card => {
    card.addEventListener("click", () => {
      let targetSort = "default";
      if (card.classList.contains("beginner")) {
        targetSort = card.classList.contains("active") ? "default" : "l1-desc";
      } else if (card.classList.contains("intermediate")) {
        targetSort = card.classList.contains("active") ? "default" : "l2-desc";
      } else if (card.classList.contains("expert")) {
        targetSort = card.classList.contains("active") ? "default" : "l3-desc";
      } else if (card.classList.contains("total")) {
        targetSort = card.classList.contains("active") ? "default" : "total-desc";
      }

      const roadmapSortSelect = document.getElementById("roadmapSortSelect");
      if (roadmapSortSelect) {
        roadmapSortSelect.value = targetSort;
      }

      syncTelemetryActiveState(targetSort);
      renderFullRoadmapMatrix(targetSort);
      renderDomainDashboardCards(targetSort);

      const q = domainSearchInput ? domainSearchInput.value.toLowerCase().trim() : "";
      if (q) {
        filterRoadmapSearch(q);
      }
    });
  });

  // Setup Sort Control
  const roadmapSortSelect = document.getElementById("roadmapSortSelect");
  if (roadmapSortSelect) {
    roadmapSortSelect.addEventListener("change", () => {
      const sortMode = roadmapSortSelect.value;
      syncTelemetryActiveState(sortMode);
      renderFullRoadmapMatrix(sortMode);
      renderDomainDashboardCards(sortMode);

      const q = domainSearchInput ? domainSearchInput.value.toLowerCase().trim() : "";
      if (q) {
        filterRoadmapSearch(q);
      }
    });
  }

  // View Switcher (Matrix vs Cards)
  setupViewSwitcher();

  // Initialize Globe
  if (document.getElementById("roadmapGlobeContainer") && typeof InteractiveGlobe !== "undefined") {
    initMainGlobe();
  }
}

/**
 * 8 Primary Domain Matrix Groups definition
 */
const matrixDomainGroups = [
  {
    title: "Communication & NetSec",
    domainKey: "Communication & Network Security",
    color: "#00e676",
    link: "roadmap-communication-security.html",
    columns: [
      { title: "Comm & NetSec", domain: "Communication & Network Security", color: "#00e676", subtracks: ["Communication and Network Security"] }
    ]
  },
  {
    title: "IAM",
    domainKey: "Identity & Access Management (IAM)",
    color: "#00e5ff",
    link: "roadmap-iam.html",
    columns: [
      { title: "IAM", domain: "Identity & Access Management (IAM)", color: "#00e5ff", subtracks: ["IAM"] }
    ]
  },
  {
    title: "Security Architecture & Engineering",
    domainKey: "Security Architecture & Engineering",
    color: "#ff9100",
    link: "roadmap-architecture-engineering.html",
    columns: [
      { title: "Cloud / SysOps", domain: "Security Architecture & Engineering", color: "#ff9100", subtracks: ["Cloud / SysOps"] },
      { title: "*nix OS", domain: "Security Architecture & Engineering", color: "#ffab00", subtracks: ["Linux / Unix"] },
      { title: "ICS / IoT", domain: "Security Architecture & Engineering", color: "#ff6d00", subtracks: ["ICS/IoT"] }
    ]
  },
  {
    title: "Asset Security",
    domainKey: "Asset Security",
    color: "#ffd600",
    link: "roadmap-asset-security.html",
    columns: [
      { title: "Asset Security", domain: "Asset Security", color: "#ffd600", subtracks: ["Asset Security"] }
    ]
  },
  {
    title: "Risk Management & GRC",
    domainKey: "Security & Risk Management",
    color: "#b388ff",
    link: "roadmap-risk-management.html",
    columns: [
      { title: "Risk & GRC", domain: "Security & Risk Management", color: "#b388ff", subtracks: ["GRC"] }
    ]
  },
  {
    title: "Assessment & Testing",
    domainKey: "Security Assessment & Testing",
    color: "#d500f9",
    link: "roadmap-assessment-testing.html",
    columns: [
      { title: "Assessment", domain: "Security Assessment & Testing", color: "#d500f9", subtracks: ["Security Assessment and Testing"] }
    ]
  },
  {
    title: "Software Security",
    domainKey: "Software Development Security",
    color: "#2979ff",
    link: "roadmap-software-security.html",
    columns: [
      { title: "Software Sec", domain: "Software Security", color: "#2979ff", subtracks: ["Software Security"] }
    ]
  },
  {
    title: "Security Operations (SOC / Blue & Red)",
    domainKey: "Security Operations (SOC / Blue & Red)",
    color: "#ff1744",
    link: "roadmap-security-operations.html",
    columns: [
      { title: "SecOps / Blue", domain: "Security Operations (SOC / Blue & Red)", color: "#ff1744", subtracks: ["Security Operations"] },
      { title: "Incident Resp", domain: "Security Operations (SOC / Blue & Red)", color: "#f50057", subtracks: ["Incident Handling"] },
      { title: "Forensics", domain: "Security Operations (SOC / Blue & Red)", color: "#d81b60", subtracks: ["Forensics"] },
      { title: "Pen Testing", domain: "Security Operations (SOC / Blue & Red)", color: "#c2185b", subtracks: ["Penetration Testing"] },
      { title: "Exploitation", domain: "Security Operations (SOC / Blue & Red)", color: "#880e4f", subtracks: ["Exploitation"] }
    ]
  }
];

/**
 * Render the 8-Domain Interactive Certification Matrix
 */
function renderFullRoadmapMatrix(sortMode = "default") {
  const matrixContainer = document.getElementById("roadmapMatrixCanvas");
  if (!matrixContainer) return;

  matrixContainer.innerHTML = "";

  // Copy and sort domain groups based on sortMode
  let sortedGroups = [...matrixDomainGroups];
  if (sortMode === "name-asc") {
    sortedGroups.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortMode === "name-desc") {
    sortedGroups.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortMode === "total-desc" || sortMode === "certs-desc") {
    sortedGroups.sort((a, b) => {
      const countA = certDatabase.filter(c => c.domain === a.domainKey).length;
      const countB = certDatabase.filter(c => c.domain === b.domainKey).length;
      return countB - countA;
    });
  } else if (sortMode === "l3-desc") {
    sortedGroups.sort((a, b) => {
      const countA = certDatabase.filter(c => c.domain === a.domainKey && c.level === "expert").length;
      const countB = certDatabase.filter(c => c.domain === b.domainKey && c.level === "expert").length;
      return countB - countA;
    });
  } else if (sortMode === "l2-desc") {
    sortedGroups.sort((a, b) => {
      const countA = certDatabase.filter(c => c.domain === a.domainKey && c.level === "intermediate").length;
      const countB = certDatabase.filter(c => c.domain === b.domainKey && c.level === "intermediate").length;
      return countB - countA;
    });
  } else if (sortMode === "l1-desc") {
    sortedGroups.sort((a, b) => {
      const countA = certDatabase.filter(c => c.domain === a.domainKey && c.level === "beginner").length;
      const countB = certDatabase.filter(c => c.domain === b.domainKey && c.level === "beginner").length;
      return countB - countA;
    });
  }

  // 1. Group Headers for the 8 primary domains
  const groupHeaderRow = document.createElement("div");
  groupHeaderRow.className = "matrix-group-headers-row";

  const cornerHeader = document.createElement("div");
  cornerHeader.className = "matrix-corner-header";
  cornerHeader.innerHTML = `<span>DOMAIN / TRACK</span>`;
  groupHeaderRow.appendChild(cornerHeader);

  const activeMatrixColumns = [];

  sortedGroups.forEach(group => {
    const headerCell = document.createElement("a");
    headerCell.href = group.link;
    headerCell.className = `matrix-domain-group-header span-${group.columns.length}`;
    headerCell.style.setProperty("--domain-col-color", group.color);
    headerCell.innerHTML = `
      <span class="group-title">${group.title}</span>
      <svg class="group-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
    `;
    groupHeaderRow.appendChild(headerCell);

    group.columns.forEach(col => activeMatrixColumns.push(col));
  });
  matrixContainer.appendChild(groupHeaderRow);

  // 2. Subtrack Column Headers
  const subtrackHeaderRow = document.createElement("div");
  subtrackHeaderRow.className = "matrix-subtrack-headers-row";

  const subtrackCorner = document.createElement("div");
  subtrackCorner.className = "matrix-subtrack-corner";
  subtrackCorner.textContent = "TIER";
  subtrackHeaderRow.appendChild(subtrackCorner);

  activeMatrixColumns.forEach(colCfg => {
    const subCol = document.createElement("div");
    subCol.className = "matrix-subtrack-header-cell";
    subCol.style.setProperty("--track-color", colCfg.color);
    subCol.textContent = colCfg.title;
    subtrackHeaderRow.appendChild(subCol);
  });
  matrixContainer.appendChild(subtrackHeaderRow);

  // 3. Render 3 Tier Rows (Expert, Intermediate, Beginner)
  let tiers = [
    { key: "expert", title: "Expert", desc: "L3 | Mastery & Elite", color: "#ff1744" },
    { key: "intermediate", title: "Intermediate", desc: "L2 | Applied & Pro", color: "#ff9100" },
    { key: "beginner", title: "Beginner", desc: "L1 | Core & Foundation", color: "#00e5ff" }
  ];

  if (sortMode === "l1-desc" || sortMode === "beginner-first") {
    tiers = [
      { key: "beginner", title: "Beginner", desc: "L1 | Core & Foundation", color: "#00e5ff" },
      { key: "intermediate", title: "Intermediate", desc: "L2 | Applied & Pro", color: "#ff9100" },
      { key: "expert", title: "Expert", desc: "L3 | Mastery & Elite", color: "#ff1744" }
    ];
  } else if (sortMode === "l2-desc") {
    tiers = [
      { key: "intermediate", title: "Intermediate", desc: "L2 | Applied & Pro", color: "#ff9100" },
      { key: "expert", title: "Expert", desc: "L3 | Mastery & Elite", color: "#ff1744" },
      { key: "beginner", title: "Beginner", desc: "L1 | Core & Foundation", color: "#00e5ff" }
    ];
  } else if (sortMode === "l3-desc" || sortMode === "expert-first") {
    tiers = [
      { key: "expert", title: "Expert", desc: "L3 | Mastery & Elite", color: "#ff1744" },
      { key: "intermediate", title: "Intermediate", desc: "L2 | Applied & Pro", color: "#ff9100" },
      { key: "beginner", title: "Beginner", desc: "L1 | Core & Foundation", color: "#00e5ff" }
    ];
  }

  tiers.forEach(tier => {
    const tierRow = document.createElement("div");
    tierRow.className = `matrix-tier-row ${tier.key}`;

    const sideLabel = document.createElement("div");
    sideLabel.className = "matrix-tier-side-label";
    sideLabel.innerHTML = `
      <div class="tier-badge-pill" style="color: ${tier.color}; border-color: ${tier.color}40; background: ${tier.color}15;">${tier.title}</div>
      <div class="tier-subtext">${tier.desc}</div>
    `;
    tierRow.appendChild(sideLabel);

    activeMatrixColumns.forEach(colCfg => {
      const cell = document.createElement("div");
      cell.className = "matrix-track-cell";
      cell.style.setProperty("--track-color", colCfg.color);

      let certsInCell = [];
      colCfg.subtracks.forEach(trackKey => {
        if (rawCertsByTrack[trackKey] && rawCertsByTrack[trackKey][tier.key]) {
          certsInCell = certsInCell.concat(rawCertsByTrack[trackKey][tier.key]);
        }
      });

      // Sort certs within cell
      if (sortMode === "name-asc") {
        certsInCell.sort((a, b) => a.localeCompare(b));
      } else if (sortMode === "name-desc") {
        certsInCell.sort((a, b) => b.localeCompare(a));
      }

      certsInCell.forEach(certName => {
        const badge = document.createElement("button");
        badge.type = "button";
        badge.className = "matrix-cert-badge";
        badge.setAttribute("data-cert-name", certName.toLowerCase());
        badge.style.setProperty("--badge-color", colCfg.color);
        badge.textContent = certName;

        badge.addEventListener("click", (e) => {
          e.preventDefault();
          openDrawer(certName, tier.key, colCfg.domain);
        });

        cell.appendChild(badge);
      });

      tierRow.appendChild(cell);
    });

    matrixContainer.appendChild(tierRow);
  });
}

/**
 * Render 8 Domain Dashboard Cards
 */
function renderDomainDashboardCards(sortMode = "default") {
  const gridContainer = document.getElementById("domainDashboardGrid");
  if (!gridContainer) return;

  gridContainer.innerHTML = "";

  let domainKeys = Object.keys(domainsMetadata);

  if (sortMode === "name-asc") {
    domainKeys.sort((a, b) => domainsMetadata[a].name.localeCompare(domainsMetadata[b].name));
  } else if (sortMode === "name-desc") {
    domainKeys.sort((a, b) => domainsMetadata[b].name.localeCompare(domainsMetadata[a].name));
  } else if (sortMode === "total-desc" || sortMode === "certs-desc") {
    domainKeys.sort((a, b) => {
      const countA = certDatabase.filter(c => c.domain === a).length;
      const countB = certDatabase.filter(c => c.domain === b).length;
      return countB - countA;
    });
  } else if (sortMode === "l3-desc") {
    domainKeys.sort((a, b) => {
      const countA = certDatabase.filter(c => c.domain === a && c.level === "expert").length;
      const countB = certDatabase.filter(c => c.domain === b && c.level === "expert").length;
      return countB - countA;
    });
  } else if (sortMode === "l2-desc") {
    domainKeys.sort((a, b) => {
      const countA = certDatabase.filter(c => c.domain === a && c.level === "intermediate").length;
      const countB = certDatabase.filter(c => c.domain === b && c.level === "intermediate").length;
      return countB - countA;
    });
  } else if (sortMode === "l1-desc") {
    domainKeys.sort((a, b) => {
      const countA = certDatabase.filter(c => c.domain === a && c.level === "beginner").length;
      const countB = certDatabase.filter(c => c.domain === b && c.level === "beginner").length;
      return countB - countA;
    });
  }

  domainKeys.forEach((domKey) => {
    const dom = domainsMetadata[domKey];
    
    // Count certs in this domain
    const domCerts = certDatabase.filter(c => c.domain === domKey);
    const expCount = domCerts.filter(c => c.level === "expert").length;
    const intCount = domCerts.filter(c => c.level === "intermediate").length;
    const begCount = domCerts.filter(c => c.level === "beginner").length;

    const card = document.createElement("div");
    card.className = "domain-roadmap-card";
    card.setAttribute("data-domain", domKey.toLowerCase());
    card.style.setProperty("--domain-color", dom.color);

    const subtrackBadges = dom.subtracks.map(st => `<span class="subtrack-pill">${st}</span>`).join(" ");

    card.innerHTML = `
      <div class="domain-card-header">
        <div class="domain-badge-wrap">
          <div class="domain-color-indicator" style="background: ${dom.color};"></div>
          <span class="domain-tier-tag" style="color: ${dom.color};">PRIMARY DOMAIN</span>
        </div>
        <span class="domain-cert-count-pill">${domCerts.length} CERTS</span>
      </div>

      <h3 class="domain-card-title">${dom.name}</h3>
      <p class="domain-card-desc">${dom.desc}</p>

      <div class="domain-subtracks-wrap" style="display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 16px;">
        ${subtrackBadges}
      </div>

      <div class="domain-tier-progress-row">
        <div class="tier-stat-item">
          <span class="tier-stat-lbl">L1 BEG</span>
          <span class="tier-stat-val" style="color: #00e5ff;">${begCount}</span>
        </div>
        <div class="tier-stat-item">
          <span class="tier-stat-lbl">L2 INT</span>
          <span class="tier-stat-val" style="color: #ff9100;">${intCount}</span>
        </div>
        <div class="tier-stat-item">
          <span class="tier-stat-lbl">L3 EXP</span>
          <span class="tier-stat-val" style="color: #ff1744;">${expCount}</span>
        </div>
      </div>

      <a href="${dom.filename}" class="domain-card-cta">
        <span>EXPLORE PATHWAY</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    `;

    gridContainer.appendChild(card);
  });
}

/**
 * Filter Roadmap Badges & Cards based on Search Query
 */
function filterRoadmapSearch(query) {
  const q = query.toLowerCase().trim();

  // 1. Filter Matrix Badges
  const matrixBadges = document.querySelectorAll(".matrix-cert-badge");
  matrixBadges.forEach(badge => {
    const certName = badge.getAttribute("data-cert-name") || "";
    if (!q) {
      badge.classList.remove("highlighted", "dimmed");
    } else {
      const match = certName.includes(q);
      if (match) {
        badge.classList.add("highlighted");
        badge.classList.remove("dimmed");
      } else {
        badge.classList.remove("highlighted");
        badge.classList.add("dimmed");
      }
    }
  });

  // 2. Filter Domain Cards
  const cards = document.querySelectorAll(".domain-roadmap-card");
  cards.forEach(card => {
    const domKey = card.getAttribute("data-domain");
    
    // Find all certifications in this domain
    const domCerts = certDatabase.filter(c => c.domain.toLowerCase() === domKey);
    
    // Filter these certifications by search query (match name, track, or vendor)
    const matchingCerts = domCerts.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.vendor.toLowerCase().includes(q) || 
      c.track.toLowerCase().includes(q)
    );

    if (!q) {
      // Restore default layout
      card.style.display = "flex";
      const countPill = card.querySelector(".domain-cert-count-pill");
      if (countPill) countPill.textContent = `${domCerts.length} CERTS`;
      
      const begVal = card.querySelector(".tier-stat-item:nth-child(1) .tier-stat-val");
      const intVal = card.querySelector(".tier-stat-item:nth-child(2) .tier-stat-val");
      const expVal = card.querySelector(".tier-stat-item:nth-child(3) .tier-stat-val");
      
      if (begVal) begVal.textContent = domCerts.filter(c => c.level === "beginner").length;
      if (intVal) intVal.textContent = domCerts.filter(c => c.level === "intermediate").length;
      if (expVal) expVal.textContent = domCerts.filter(c => c.level === "expert").length;
    } else if (matchingCerts.length > 0) {
      // Show card and update counts to show filtered results
      card.style.display = "flex";
      const countPill = card.querySelector(".domain-cert-count-pill");
      if (countPill) countPill.textContent = `${matchingCerts.length} MATCHED`;
      
      const begVal = card.querySelector(".tier-stat-item:nth-child(1) .tier-stat-val");
      const intVal = card.querySelector(".tier-stat-item:nth-child(2) .tier-stat-val");
      const expVal = card.querySelector(".tier-stat-item:nth-child(3) .tier-stat-val");
      
      if (begVal) begVal.textContent = matchingCerts.filter(c => c.level === "beginner").length;
      if (intVal) intVal.textContent = matchingCerts.filter(c => c.level === "intermediate").length;
      if (expVal) expVal.textContent = matchingCerts.filter(c => c.level === "expert").length;
    } else {
      // Hide card since there are no matching certifications in this domain
      card.style.display = "none";
    }
  });
}

/**
 * View Switcher (Matrix vs Cards)
 */
let _mainGlobeInstance = null;

function setupViewSwitcher() {
  const viewMatrixBtn = document.getElementById("viewMatrixBtn");
  const viewCardsBtn = document.getElementById("viewCardsBtn");
  const matrixSection = document.getElementById("matrixSection");
  const cardsSection = document.getElementById("cardsSection");

  if (!viewMatrixBtn || !viewCardsBtn || !matrixSection || !cardsSection) return;

  viewMatrixBtn.addEventListener("click", () => {
    viewMatrixBtn.classList.add("active");
    viewCardsBtn.classList.remove("active");
    matrixSection.style.display = "block";
    cardsSection.style.display = "none";
  });

  viewCardsBtn.addEventListener("click", () => {
    viewCardsBtn.classList.add("active");
    viewMatrixBtn.classList.remove("active");
    matrixSection.style.display = "none";
    cardsSection.style.display = "grid";
    
    // Ensure cards are rendered if empty
    const grid = document.getElementById("domainDashboardGrid");
    if (grid && grid.children.length === 0) {
      const sortSelect = document.getElementById("roadmapSortSelect");
      renderDomainDashboardCards(sortSelect ? sortSelect.value : "default");
    }

    // Initialize or resize 3D Globe when cards view becomes visible
    setTimeout(() => {
      if (!_mainGlobeInstance) {
        initMainGlobe();
      }
      window.dispatchEvent(new Event("resize"));
    }, 50);
  });
}

/**
 * Initialize 3D Globe for Main Roadmap
 */
function initMainGlobe() {
  const container = document.getElementById("roadmapGlobeContainer");
  if (!container || typeof InteractiveGlobe === "undefined") return;
  if (_mainGlobeInstance) return;

  const vendorColors = {
    "AWS": "#00f0ff",
    "Microsoft": "#00a4ef",
    "Google": "#4285f4",
    "Cisco": "#00bceb",
    "OffSec": "#ff0055",
    "GIAC": "#ff9900",
    "ISC2": "#00ff66",
    "ISACA": "#a855f7",
    "EC-Council": "#ff3366",
    "Hack The Box": "#9fef00",
    "Security Blue Team": "#3b82f6",
    "TCM Security": "#f43f5e",
    "Red Hat": "#ee0000",
    "Check Point": "#ff007f",
    "SABSA": "#eab308"
  };

  const markers = Object.keys(vendorHQs).map(k => {
    const matchingCount = certDatabase.filter(c => 
      c.vendor.toLowerCase() === k.toLowerCase() || 
      c.name.toLowerCase().includes(k.toLowerCase())
    ).length;

    return {
      key: k,
      lat: vendorHQs[k].lat,
      lon: vendorHQs[k].lon,
      label: vendorHQs[k].label,
      desc: vendorHQs[k].desc,
      certCount: matchingCount,
      color: vendorColors[k] || "var(--red)"
    };
  });

  _mainGlobeInstance = new InteractiveGlobe(container, {
    markers: markers,
    onMarkerClick: (marker) => {
      selectVendorFromGlobe(marker);
    }
  });

  // Setup Quick Filter Chips below the globe
  setupGlobeQuickFilters(markers);
}

/**
 * Handle vendor selection from Globe Marker or Quick Filter Chip
 */
function selectVendorFromGlobe(marker) {
  if (!marker) return;

  if (_mainGlobeInstance && marker.lat !== undefined && marker.lon !== undefined) {
    _mainGlobeInstance.rotateTo(marker.lat, marker.lon);
  }

  // Update HUD text displays
  const sectorElem = document.getElementById("globeSectorFocus");
  if (sectorElem) {
    sectorElem.textContent = (marker.key || marker.label).toUpperCase();
  }

  const statusElem = document.getElementById("globeStatusFocus");
  if (statusElem) {
    statusElem.textContent = marker.certCount !== undefined ? `${marker.certCount} CERTS` : "FILTERED";
    statusElem.style.color = "var(--red)";
  }

  // Filter certifications in matrix, dashboard cards, or subpage tree
  const certSearchInput = document.getElementById("certSearchInput");
  const domainSearchInput = document.getElementById("domainSearchInput");
  const activeSearchInput = certSearchInput || domainSearchInput;

  if (activeSearchInput) {
    activeSearchInput.value = marker.key || marker.label;
    activeSearchInput.dispatchEvent(new Event("input"));
  }

  // Highlight active quick chip
  document.querySelectorAll(".globe-chip-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-vendor") === (marker.key || marker.label));
  });

  // Display active filter bar if available
  const filterIndicator = document.getElementById("activeFilterIndicator");
  const filterVendorName = document.getElementById("filterVendorName");
  if (filterIndicator && filterVendorName) {
    filterVendorName.textContent = marker.key || marker.label;
    filterIndicator.style.display = "flex";
  }
}

/**
 * Inject Quick Select Vendor Chips below Globe
 */
function setupGlobeQuickFilters(markers) {
  const container = document.getElementById("globeQuickChips");
  if (!container) return;

  container.innerHTML = "";

  // "ALL" Reset Button
  const allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = "globe-chip-btn active";
  allBtn.setAttribute("data-vendor", "ALL");
  allBtn.textContent = "ALL";
  allBtn.addEventListener("click", () => {
    document.querySelectorAll(".globe-chip-btn").forEach(b => b.classList.remove("active"));
    allBtn.classList.add("active");

    const sectorElem = document.getElementById("globeSectorFocus");
    if (sectorElem) sectorElem.textContent = "WORLDWIDE";

    const statusElem = document.getElementById("globeStatusFocus");
    if (statusElem) {
      statusElem.textContent = "ACTIVE";
      statusElem.style.color = "#00ff66";
    }

    const certSearchInput = document.getElementById("certSearchInput");
    const domainSearchInput = document.getElementById("domainSearchInput");
    const activeSearchInput = certSearchInput || domainSearchInput;
    if (activeSearchInput) {
      activeSearchInput.value = "";
      activeSearchInput.dispatchEvent(new Event("input"));
    }

    const filterIndicator = document.getElementById("activeFilterIndicator");
    if (filterIndicator) filterIndicator.style.display = "none";
  });
  container.appendChild(allBtn);

  // Top 10 Major Vendors
  const topVendors = ["AWS", "OffSec", "Cisco", "ISC2", "GIAC", "Microsoft", "CompTIA", "Hack The Box", "Red Hat", "Check Point"];

  topVendors.forEach(vKey => {
    const marker = markers.find(m => m.key.toLowerCase() === vKey.toLowerCase());
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "globe-chip-btn";
    btn.setAttribute("data-vendor", vKey);
    btn.textContent = vKey;
    btn.addEventListener("click", () => {
      if (marker) {
        selectVendorFromGlobe(marker);
      } else {
        selectVendorFromGlobe({ key: vKey, label: vKey });
      }
    });
    container.appendChild(btn);
  });
}

/**
 * Slide-out Dossier Drawer
 */
function openDrawer(name, level, domain) {
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
  const meta = domainsMetadata[domain] || { color: "#00e5ff" };
  
  const hex = meta.color || "#00e5ff";
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 229;
  const b = parseInt(hex.slice(5, 7), 16) || 255;
  const rgb = `${r}, ${g}, ${b}`;

  const drawerCode = document.getElementById("drawerCertCode");
  if (drawerCode) drawerCode.textContent = detail.name;
  const drawerFull = document.getElementById("drawerCertFullname");
  if (drawerFull) drawerFull.textContent = detail.fullName;
  const drawerDom = document.getElementById("drawerCertDomain");
  if (drawerDom) drawerDom.textContent = detail.domain;

  const levelTitle = level.toUpperCase();
  const drawerLvl = document.getElementById("drawerCertLevel");
  if (drawerLvl) drawerLvl.textContent = `${levelTitle} | Tier ${level === "beginner" ? 1 : level === "intermediate" ? 2 : 3}`;
  
  const drawerIss = document.getElementById("drawerCertIssuer");
  if (drawerIss) drawerIss.textContent = detail.issuer;
  const drawerFmt = document.getElementById("drawerCertExamFormat");
  if (drawerFmt) drawerFmt.textContent = detail.examFormat;
  const drawerPrp = document.getElementById("drawerCertPrep");
  if (drawerPrp) drawerPrp.textContent = detail.estPrep;
  const drawerDsc = document.getElementById("drawerCertDesc");
  if (drawerDsc) drawerDsc.textContent = detail.description;

  const queryBtn = document.getElementById("drawerQueryBtn");
  if (queryBtn) {
    if (typeof certLinks !== "undefined" && certLinks[name]) {
      queryBtn.href = certLinks[name];
      queryBtn.textContent = "LAUNCH_OFFICIAL_PORTAL";
    } else {
      queryBtn.href = `https://www.google.com/search?q=${encodeURIComponent(detail.issuer + " " + detail.fullName + " certification")}`;
      queryBtn.textContent = "INITIALIZE_EXTERNAL_INTEL_QUERY";
    }
  }

  const subwayDrawer = document.getElementById("subwayDrawer");
  const subwayOverlay = document.getElementById("subwayDrawerOverlay");
  if (subwayDrawer) {
    subwayDrawer.style.setProperty("--accent-rgb", rgb);
    subwayDrawer.style.borderLeftColor = meta.color;
    subwayDrawer.classList.add("open");
  }
  if (subwayOverlay) {
    subwayOverlay.classList.add("open");
  }
  document.body.classList.add("drawer-active");
}

function closeDrawer() {
  const subwayDrawer = document.getElementById("subwayDrawer");
  const subwayOverlay = document.getElementById("subwayDrawerOverlay");
  if (subwayDrawer) subwayDrawer.classList.remove("open");
  if (subwayOverlay) subwayOverlay.classList.remove("open");
  document.body.classList.remove("drawer-active");
}

// Bind drawer close actions
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn1 = document.getElementById("drawerClose");
  const closeBtn2 = document.getElementById("drawerCloseBtn");
  const overlay = document.getElementById("subwayDrawerOverlay");

  const handleClose = (e) => {
    if (e) e.preventDefault();
    closeDrawer();
  };

  if (closeBtn1) {
    closeBtn1.addEventListener("click", handleClose);
    closeBtn1.addEventListener("touchstart", handleClose, { passive: false });
  }
  if (closeBtn2) {
    closeBtn2.addEventListener("click", handleClose);
    closeBtn2.addEventListener("touchstart", handleClose, { passive: false });
  }
  if (overlay) {
    overlay.addEventListener("click", handleClose);
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      closeDrawer();
    }
  });
});

/**
 * Initialize Domain-Specific Subpages (e.g. roadmap-communication-security.html)
 */

/**
 * Helper: Resolve Certifications for any of the 8 Primary Domains or 15 Specific Tracks
 */
function getDomainOrTrackCerts(query) {
  if (!query) return certDatabase;
  const q = query.toLowerCase().trim();
  
  // 1. Direct domain name match
  let matches = certDatabase.filter(c => c.domain.toLowerCase() === q);
  if (matches.length > 0) return matches;
  
  // 2. Direct track name match
  matches = certDatabase.filter(c => c.track.toLowerCase() === q);
  if (matches.length > 0) return matches;
  
  // 3. Normalized alias mapping table for all 15 subpages
  const aliasToTracks = {
    "security architecture & engineering": ["Cloud / SysOps", "Linux / Unix", "ICS/IoT"],
    "security architecture and engineering": ["Cloud / SysOps", "Linux / Unix", "ICS/IoT"],
    "architecture & engineering": ["Cloud / SysOps", "Linux / Unix", "ICS/IoT"],
    "cloud & sysops security": ["Cloud / SysOps"],
    "cloud / sysops security": ["Cloud / SysOps"],
    "cloud / sysops": ["Cloud / SysOps"],
    "linux / unix security": ["Linux / Unix"],
    "linux / unix": ["Linux / Unix"],
    "ics / ot / iot security": ["ICS/IoT"],
    "ics / iot": ["ICS/IoT"],
    "ics/iot": ["ICS/IoT"],
    "communication & network security": ["Communication and Network Security"],
    "communication and network security": ["Communication and Network Security"],
    "identity & access management (iam)": ["IAM"],
    "identity and access management (iam)": ["IAM"],
    "iam": ["IAM"],
    "asset security": ["Asset Security"],
    "security & risk management": ["GRC"],
    "security and risk management": ["GRC"],
    "governance, risk & compliance (grc)": ["GRC"],
    "governance, risk and compliance (grc)": ["GRC"],
    "grc": ["GRC"],
    "security assessment & testing": ["Security Assessment and Testing"],
    "security assessment and testing": ["Security Assessment and Testing"],
    "software security": ["Software Security"],
    "security operations (soc / blue team)": ["Security Operations", "Incident Handling", "Forensics", "Penetration Testing", "Exploitation"],
    "security operations (soc / blue & red)": ["Security Operations", "Incident Handling", "Forensics", "Penetration Testing", "Exploitation"],
    "security operations": ["Security Operations"],
    "incident handling & response": ["Incident Handling"],
    "incident handling and response": ["Incident Handling"],
    "incident handling": ["Incident Handling"],
    "digital forensics": ["Forensics"],
    "forensics": ["Forensics"],
    "penetration testing & red team": ["Penetration Testing", "Exploitation"],
    "penetration testing and red team": ["Penetration Testing", "Exploitation"],
    "penetration testing": ["Penetration Testing"],
    "exploitation": ["Exploitation"]
  };

  if (aliasToTracks[q]) {
    const targetTracks = aliasToTracks[q].map(t => t.toLowerCase());
    matches = certDatabase.filter(c => targetTracks.includes(c.track.toLowerCase()));
    if (matches.length > 0) return matches;
  }

  for (const alias in aliasToTracks) {
    if (q.includes(alias) || alias.includes(q)) {
      const targetTracks = aliasToTracks[alias].map(t => t.toLowerCase());
      matches = certDatabase.filter(c => targetTracks.includes(c.track.toLowerCase()));
      if (matches.length > 0) return matches;
    }
  }

  // 4. Fallback search
  return certDatabase.filter(c => 
    c.domain.toLowerCase().includes(q) || 
    q.includes(c.domain.toLowerCase()) ||
    c.track.toLowerCase().includes(q) ||
    q.includes(c.track.toLowerCase())
  );
}

/**
 * Initialize Domain-Specific Subpages (e.g. roadmap-architecture-engineering.html)
 */
function initDomainRoadmap(requestedDomainName) {
  const domainCerts = getDomainOrTrackCerts(requestedDomainName);
  
  // 1. Update Domain Telemetry Stats
  const begCerts = domainCerts.filter(c => c.level === "beginner");
  const intCerts = domainCerts.filter(c => c.level === "intermediate");
  const expCerts = domainCerts.filter(c => c.level === "expert");

  const statTotal = document.getElementById("domainTotalCount") || document.getElementById("statTotal");
  if (statTotal) statTotal.textContent = domainCerts.length;
  
  const statBeg = document.getElementById("domainBeginnerCount") || document.getElementById("statBeginner");
  if (statBeg) statBeg.textContent = begCerts.length;
  
  const statInt = document.getElementById("domainIntermediateCount") || document.getElementById("statIntermediate");
  if (statInt) statInt.textContent = intCerts.length;
  
  const statExp = document.getElementById("domainExpertCount") || document.getElementById("statExpert");
  if (statExp) statExp.textContent = expCerts.length;

  // Update domain description
  const domainDescElem = document.getElementById("domainDesc");
  if (domainDescElem) {
    const meta = domainsMetadata[requestedDomainName];
    if (meta && meta.desc) {
      domainDescElem.textContent = meta.desc;
    } else {
      const matchKey = Object.keys(domainsMetadata).find(k => 
        k.toLowerCase().includes(requestedDomainName.toLowerCase().split("(")[0].trim()) || 
        requestedDomainName.toLowerCase().includes(k.toLowerCase().split("(")[0].trim())
      );
      if (matchKey && domainsMetadata[matchKey].desc) {
        domainDescElem.textContent = domainsMetadata[matchKey].desc;
      } else if (domainCerts[0] && domainsMetadata[domainCerts[0].domain]) {
        domainDescElem.textContent = domainsMetadata[domainCerts[0].domain].desc;
      }
    }
  }

  // 2. Sort & Controls Injection for Subpage
  const searchInput = document.getElementById("certSearchInput") || document.getElementById("domainSearchInput");
  let sortSelect = document.getElementById("subpageSortSelect");

  if (!sortSelect && searchInput) {
    const searchContainer = searchInput.closest(".hud-search-container");
    if (searchContainer) {
      let controlsRow = searchContainer.closest(".subpage-controls-row");
      if (!controlsRow) {
        controlsRow = document.createElement("div");
        controlsRow.className = "subpage-controls-row";
        searchContainer.parentNode.insertBefore(controlsRow, searchContainer);
        controlsRow.appendChild(searchContainer);
      }

      const sortContainer = document.createElement("div");
      sortContainer.className = "hud-sort-container";
      sortContainer.innerHTML = `
        <label for="subpageSortSelect" class="hud-sort-label">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="14" y2="12"></line>
            <line x1="4" y1="18" x2="8" y2="18"></line>
          </svg>
          <span>SORT:</span>
        </label>
        <select id="subpageSortSelect" class="hud-sort-select" aria-label="Sort pathway certifications">
          <option value="expert-first">EXPERT (L3 &rarr; L1)</option>
          <option value="intermediate-first">INTERMEDIATE (L2 FIRST)</option>
          <option value="beginner-first">BEGINNER (L1 &rarr; L3)</option>
          <option value="expert-only">EXPERT ONLY (L3)</option>
          <option value="intermediate-only">INTERMEDIATE ONLY (L2)</option>
          <option value="beginner-only">BEGINNER ONLY (L1)</option>
          <option value="name-asc">NAME (A &rarr; Z)</option>
          <option value="name-desc">NAME (Z &rarr; A)</option>
          <option value="vendor-asc">VENDOR (A &rarr; Z)</option>
        </select>
        <span class="hud-sort-arrow" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      `;
      controlsRow.appendChild(sortContainer);
      sortSelect = sortContainer.querySelector("#subpageSortSelect");
    }
  }

  // 3. Render Full Pathway Tree into #roadmapTree with dynamic sorting
  const treeContainer = document.getElementById("roadmapTree");

  function renderDomainTree(sortMode = "expert-first") {
    if (!treeContainer) return;
    treeContainer.innerHTML = "";

    let tierConfigs = [
      { key: "expert", title: "Expert", levelTag: "L3", certs: [...expCerts], color: "#ff1744" },
      { key: "intermediate", title: "Intermediate", levelTag: "L2", certs: [...intCerts], color: "#ff9100" },
      { key: "beginner", title: "Beginner", levelTag: "L1", certs: [...begCerts], color: "#00e5ff" }
    ];

    if (sortMode === "beginner-first") {
      tierConfigs = [
        { key: "beginner", title: "Beginner", levelTag: "L1", certs: [...begCerts], color: "#00e5ff" },
        { key: "intermediate", title: "Intermediate", levelTag: "L2", certs: [...intCerts], color: "#ff9100" },
        { key: "expert", title: "Expert", levelTag: "L3", certs: [...expCerts], color: "#ff1744" }
      ];
    } else if (sortMode === "intermediate-first") {
      tierConfigs = [
        { key: "intermediate", title: "Intermediate", levelTag: "L2", certs: [...intCerts], color: "#ff9100" },
        { key: "expert", title: "Expert", levelTag: "L3", certs: [...expCerts], color: "#ff1744" },
        { key: "beginner", title: "Beginner", levelTag: "L1", certs: [...begCerts], color: "#00e5ff" }
      ];
    } else if (sortMode === "expert-only") {
      tierConfigs = [
        { key: "expert", title: "Expert", levelTag: "L3", certs: [...expCerts], color: "#ff1744" }
      ];
    } else if (sortMode === "intermediate-only") {
      tierConfigs = [
        { key: "intermediate", title: "Intermediate", levelTag: "L2", certs: [...intCerts], color: "#ff9100" }
      ];
    } else if (sortMode === "beginner-only") {
      tierConfigs = [
        { key: "beginner", title: "Beginner", levelTag: "L1", certs: [...begCerts], color: "#00e5ff" }
      ];
    }

    tierConfigs.forEach(tier => {
      if (tier.certs.length === 0) return;

      const tierBlock = document.createElement("div");
      tierBlock.className = `tree-tier-block ${tier.key}`;

      tierBlock.innerHTML = `
        <div class="tree-tier-header">
          <div class="tree-tier-title">
            <span class="tree-tier-dot" style="color: ${tier.color}; background: ${tier.color};"></span>
            <span>${tier.title} Tier</span>
          </div>
          <span class="tree-tier-badge">${tier.certs.length} NODES</span>
        </div>
      `;

      // Group by vendor
      const vendorGroups = {};
      tier.certs.forEach(c => {
        if (!vendorGroups[c.vendor]) vendorGroups[c.vendor] = [];
        vendorGroups[c.vendor].push(c);
      });

      let vendorList = Object.keys(vendorGroups);
      if (sortMode === "vendor-asc") {
        vendorList.sort((a, b) => a.localeCompare(b));
      }

      vendorList.forEach(vendor => {
        const vendorSec = document.createElement("div");
        vendorSec.className = "vendor-section";
        vendorSec.setAttribute("data-vendor", vendor.toLowerCase());

        const vendorTitle = document.createElement("div");
        vendorTitle.className = "vendor-title";
        vendorTitle.textContent = vendor.toUpperCase();
        vendorSec.appendChild(vendorTitle);

        const cardsGrid = document.createElement("div");
        cardsGrid.className = "cert-cards-grid";

        let certList = vendorGroups[vendor];
        if (sortMode === "name-asc") {
          certList = [...certList].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortMode === "name-desc") {
          certList = [...certList].sort((a, b) => b.name.localeCompare(a.name));
        }

        certList.forEach(c => {
          const detail = getCertDetails(c.name, tier.key, requestedDomainName);
          const card = document.createElement("div");
          card.className = "cert-card";
          card.setAttribute("data-cert-name", c.name.toLowerCase());
          card.setAttribute("data-vendor", c.vendor.toLowerCase());

          card.innerHTML = `
            <div class="cert-card-header">
              <span class="cert-card-code">${detail.name}</span>
              <span class="cert-level-tag ${tier.key}">${tier.levelTag || (tier.key === "expert" ? "L3" : tier.key === "intermediate" ? "L2" : "L1")}</span>
            </div>
            <div class="cert-card-name">${detail.fullName}</div>
            <div class="cert-card-footer">
              <span class="cert-card-issuer">${detail.issuer}</span>
              <span class="cert-card-prep">${detail.estPrep}</span>
            </div>
          `;

          card.addEventListener("click", () => {
            openDrawer(c.name, tier.key, requestedDomainName);
          });

          cardsGrid.appendChild(card);
        });

        vendorSec.appendChild(cardsGrid);
        tierBlock.appendChild(vendorSec);
      });

      treeContainer.appendChild(tierBlock);
    });
  }

  // 4. Filter and Search Applicator
  function applySubpageSearch() {
    const q = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const cards = document.querySelectorAll("#roadmapTree .cert-card");
    cards.forEach(card => {
      const name = card.getAttribute("data-cert-name") || "";
      const vendor = card.getAttribute("data-vendor") || "";
      const match = !q || name.includes(q) || vendor.includes(q);
      card.style.display = match ? "flex" : "none";
    });

    // Hide empty vendor sections
    document.querySelectorAll("#roadmapTree .vendor-section").forEach(sec => {
      const visibleCards = sec.querySelectorAll(".cert-card:not([style*='display: none'])");
      sec.style.display = visibleCards.length > 0 ? "flex" : "none";
    });

    // Hide empty tier blocks
    document.querySelectorAll("#roadmapTree .tree-tier-block").forEach(block => {
      const visibleCards = block.querySelectorAll(".cert-card:not([style*='display: none'])");
      block.style.display = visibleCards.length > 0 ? "block" : "none";
    });
  }

  // 5. Telemetry Cards Interactive Click Filter / Sort
  const subpageTelemetryCards = document.querySelectorAll(".subway-section .hud-telemetry-panel .telemetry-card");

  function syncSubpageTelemetryActiveState(sortMode) {
    subpageTelemetryCards.forEach(c => c.classList.remove("active"));
    if (sortMode === "beginner-first" || sortMode === "beginner-only") {
      const c = document.querySelector(".subway-section .hud-telemetry-panel .telemetry-card.beginner");
      if (c) c.classList.add("active");
    } else if (sortMode === "intermediate-first" || sortMode === "intermediate-only") {
      const c = document.querySelector(".subway-section .hud-telemetry-panel .telemetry-card.intermediate");
      if (c) c.classList.add("active");
    } else if (sortMode === "expert-first" || sortMode === "expert-only") {
      const c = document.querySelector(".subway-section .hud-telemetry-panel .telemetry-card.expert");
      if (c) c.classList.add("active");
    } else if (sortMode === "total") {
      const c = document.querySelector(".subway-section .hud-telemetry-panel .telemetry-card.total");
      if (c) c.classList.add("active");
    }
  }

  subpageTelemetryCards.forEach(card => {
    card.addEventListener("click", () => {
      let targetSort = "expert-first";
      if (card.classList.contains("beginner")) {
        targetSort = card.classList.contains("active") ? "expert-first" : "beginner-first";
      } else if (card.classList.contains("intermediate")) {
        targetSort = card.classList.contains("active") ? "expert-first" : "intermediate-first";
      } else if (card.classList.contains("expert")) {
        targetSort = card.classList.contains("active") ? "beginner-first" : "expert-first";
      } else if (card.classList.contains("total")) {
        targetSort = "expert-first";
      }

      if (sortSelect) {
        sortSelect.value = targetSort;
      }
      syncSubpageTelemetryActiveState(targetSort);
      renderDomainTree(targetSort);
      applySubpageSearch();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const sortMode = sortSelect.value;
      syncSubpageTelemetryActiveState(sortMode);
      renderDomainTree(sortMode);
      applySubpageSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      applySubpageSearch();
    });
  }

  // Initial tree render
  renderDomainTree("expert-first");

  // 6. Initialize 3D Globe for Subpage
  if (document.getElementById("roadmapGlobeContainer") && typeof InteractiveGlobe !== "undefined") {
    initMainGlobe();
  }

  // 7. Vendor Filtering Integration
  const filterIndicator = document.getElementById("activeFilterIndicator");
  const filterVendorName = document.getElementById("filterVendorName");
  const resetFilterBtn = document.getElementById("resetFilterBtn");

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", () => {
      if (filterIndicator) filterIndicator.style.display = "none";
      if (searchInput) searchInput.value = "";
      applySubpageSearch();
    });
  }
}


function setupMatrixDragScroll() {
  const slider = document.getElementById("roadmapMatrixWrapper") || document.querySelector(".roadmap-matrix-wrapper");
  const navLeft = document.getElementById("matrixNavLeft");
  const navRight = document.getElementById("matrixNavRight");
  const topTrack = document.getElementById("matrixTopScrollbarTrack");
  const topThumb = document.getElementById("matrixTopScrollbarThumb");
  if (!slider) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasDragged = false;
  const dragThreshold = 6;

  // 1. Sync Top Orange Scrollbar thumb position and width with slider scroll
  function updateTopThumb() {
    if (!topTrack || !topThumb) return;
    const scrollWidth = slider.scrollWidth;
    const clientWidth = slider.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      topThumb.style.display = "none";
      return;
    }
    topThumb.style.display = "block";
    const trackWidth = topTrack.clientWidth;
    const thumbWidth = Math.max(48, (clientWidth / scrollWidth) * trackWidth);
    topThumb.style.width = `${thumbWidth}px`;
    const availableTrack = trackWidth - thumbWidth;
    const ratio = Math.min(1, Math.max(0, slider.scrollLeft / maxScroll));
    const thumbLeft = ratio * availableTrack;
    topThumb.style.transform = `translateX(${thumbLeft}px)`;
  }

  // 2. Sync floating edge nav buttons visibility with scroll position
  function updateNavVisibility() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (navLeft) {
      if (slider.scrollLeft > 15) {
        navLeft.classList.add("visible");
      } else {
        navLeft.classList.remove("visible");
      }
    }
    if (navRight) {
      if (maxScroll > 10 && slider.scrollLeft < maxScroll - 15) {
        navRight.classList.add("visible");
      } else {
        navRight.classList.remove("visible");
      }
    }
  }

  function handleScrollSync() {
    updateTopThumb();
    updateNavVisibility();
  }

  slider.addEventListener("scroll", () => {
    requestAnimationFrame(handleScrollSync);
  });
  window.addEventListener("resize", () => {
    requestAnimationFrame(handleScrollSync);
  });
  setTimeout(handleScrollSync, 150);

  // 3. Interactive Dragging on the Top Orange Thumb (Mouse & Touch)
  if (topTrack && topThumb) {
    let isThumbDragging = false;
    let thumbStartX = 0;
    let initialScrollLeft = 0;

    const onThumbStart = (clientX) => {
      isThumbDragging = true;
      topThumb.classList.add("active");
      thumbStartX = clientX;
      initialScrollLeft = slider.scrollLeft;
      slider.style.scrollBehavior = "auto";
    };

    const onThumbMove = (clientX) => {
      if (!isThumbDragging) return;
      const deltaX = clientX - thumbStartX;
      const trackWidth = topTrack.clientWidth;
      const thumbWidth = topThumb.offsetWidth;
      const availableTrack = trackWidth - thumbWidth;
      if (availableTrack <= 0) return;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const deltaScroll = (deltaX / availableTrack) * maxScroll;
      slider.scrollLeft = initialScrollLeft + deltaScroll;
    };

    const onThumbEnd = () => {
      if (isThumbDragging) {
        isThumbDragging = false;
        topThumb.classList.remove("active");
        slider.style.scrollBehavior = "smooth";
      }
    };

    // Mouse drag on top thumb
    topThumb.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      onThumbStart(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
      if (isThumbDragging) {
        e.preventDefault();
        onThumbMove(e.clientX);
      }
    });

    window.addEventListener("mouseup", onThumbEnd);

    // Touch drag on top thumb (Mobile)
    topThumb.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        onThumbStart(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (isThumbDragging && e.touches.length === 1) {
        onThumbMove(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener("touchend", onThumbEnd);
    window.addEventListener("touchcancel", onThumbEnd);

    // Click anywhere on track jumps to position
    topTrack.addEventListener("click", (e) => {
      if (e.target === topThumb) return;
      const rect = topTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const trackWidth = topTrack.clientWidth;
      const thumbWidth = topThumb.offsetWidth;
      const targetThumbLeft = clickX - (thumbWidth / 2);
      const availableTrack = trackWidth - thumbWidth;
      if (availableTrack <= 0) return;
      const ratio = Math.min(1, Math.max(0, targetThumbLeft / availableTrack));
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      slider.scrollTo({ left: ratio * maxScroll, behavior: "smooth" });
    });
  }

  // 4. 1-Click floating buttons scroll by column group
  if (navLeft) {
    navLeft.addEventListener("click", (e) => {
      e.preventDefault();
      slider.scrollBy({ left: -380, behavior: "smooth" });
    });
  }
  if (navRight) {
    navRight.addEventListener("click", (e) => {
      e.preventDefault();
      slider.scrollBy({ left: 380, behavior: "smooth" });
    });
  }

  // 5. Smooth universal mouse drag across canvas (including badges and empty space)
  slider.addEventListener("mousedown", (e) => {
    // Only primary mouse button
    if (e.button !== 0) return;
    // Don't drag if clicking navigation arrows, links, or top scrollbar
    if (e.target.closest("a") || e.target.closest(".matrix-floating-nav") || e.target.closest(".matrix-top-scrollbar-track")) {
      return;
    }
    isDown = true;
    hasDragged = false;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.scrollBehavior = "auto";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const x = e.pageX - slider.offsetLeft;
    const distance = Math.abs(x - startX);
    if (distance > dragThreshold) {
      hasDragged = true;
      slider.classList.add("dragging");
    }
    if (hasDragged) {
      e.preventDefault();
      const walk = (x - startX) * 1.4;
      slider.scrollLeft = scrollLeft - walk;
    }
  });

  window.addEventListener("mouseup", () => {
    if (isDown) {
      isDown = false;
      slider.style.scrollBehavior = "smooth";
      if (hasDragged) {
        slider.classList.remove("dragging");
        // Keep hasDragged true for 80ms so badge click event can be suppressed
        setTimeout(() => { hasDragged = false; }, 80);
      }
    }
  });

  // Capture phase: Suppress badge clicks if mouse was dragged
  slider.addEventListener("click", (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
}
