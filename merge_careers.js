const fs = require('fs');
const clientPage = fs.readFileSync('src/app/careers/client-page.tsx', 'utf8');
const careersClient = fs.readFileSync('src/app/careers/CareersClient.tsx', 'utf8');

const imports = `import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, GraduationCap, Briefcase, ClipboardList, Mail, Users, Clock, ArrowRight, ShieldCheck, Phone, X, User, Calendar, Upload, RefreshCw } from "lucide-react";
import { jobsList } from "./careersData";`;

const stateAndFunctions = `
  const [applyingJob, setApplyingJob] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz023456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    if (applyingJob) {
      setCaptchaCode(generateCaptcha());
    }
  }, [applyingJob]);

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("formType", "Job Application");
    formData.append("jobTitle", applyingJob?.title || "Unknown");

    const userCaptcha = formData.get("captcha") as string;
    if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      alert("Verification code is incorrect. Please try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        alert("There was an error submitting your application. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
`;

const modalContent = careersClient.split('{/* Job Application Modal */}')[1].split('</form>')[0] + '</form>\n              )}\\n            </div>\\n          </div>\\n        </div>\\n      )}';

let newClientPage = clientPage.replace(/import.*?;/g, '').replace(/^\s*$/gm, '');
newClientPage = 'use client;\n' + imports + '\n\n' + newClientPage.replace('use client;', '').replace('"use client";', '');

newClientPage = newClientPage.replace('export default function CareersClientPage({ pageData }: { pageData: any }) {', 'export default function CareersClientPage({ pageData }: { pageData: any }) {' + stateAndFunctions);

newClientPage = newClientPage.replace('<button className="w-full bg-[#f8fafc]', '<button onClick={() => { setApplyingJob(job); setSelectedFile(null); }} className="w-full bg-[#f8fafc]');

newClientPage = newClientPage.replace('    </div>\n  );\n}', '      {/* Job Application Modal */}' + modalContent + '\n    </div>\n  );\n}');

newClientPage = newClientPage.replace('{jobsList.map((job, idx) => (', '{(pageData?.jobs && pageData.jobs.length > 0 ? pageData.jobs : jobsList).map((job: any, idx: number) => (');
newClientPage = newClientPage.replace(/>\s*jobs@dmhospital\.org\s*</g, '>{pageData?.applyEmail || "jobs@dmhospital.org"}<');
newClientPage = newClientPage.replace(/mailto:jobs@dmhospital\.org/g, 'mailto:${pageData?.applyEmail || "jobs@dmhospital.org"}');
newClientPage = newClientPage.replace(/>\s*Please send an email with your CV mentioning the Job Title in the subject line\.\s*</g, '>{pageData?.applyInstruction || "Please send an email with your CV mentioning the Job Title in the subject line."}<');
newClientPage = newClientPage.replace(/>\s*Active Requirements at DMH\s*</g, '>{pageData?.pageHeader || "Active Requirements at DMH"}<');

fs.writeFileSync('src/app/careers/client-page.tsx', newClientPage);
console.log('Merged successfully');
