const fs = require('fs');

function processFile(path, formsInfo) {
    let content = fs.readFileSync(path, 'utf8');

    // Add useState to react import if not there
    if (content.includes('import React, { useEffect, useRef } from "react";')) {
        content = content.replace(
            'import React, { useEffect, useRef } from "react";',
            'import React, { useEffect, useRef, useState } from "react";'
        );
    } else if (content.includes('import React, { useEffect, useRef, useState } from "react";')) {
        // already has it
    }

    // Insert state variables after refs
    let stateDecls = '';
    for (const info of formsInfo) {
        stateDecls += `\n  const [${info.stateName}, ${info.setStateName}] = useState(false);`;
    }
    
    // Find where to insert state variables (after formRef or scrollContainerRef)
    if (content.includes('const formRef = useRef<HTMLFormElement>(null);')) {
        content = content.replace(
            'const formRef = useRef<HTMLFormElement>(null);',
            'const formRef = useRef<HTMLFormElement>(null);' + stateDecls
        );
    } else if (content.includes('const registerFormRef = useRef<HTMLFormElement>(null);')) {
        content = content.replace(
            'const registerFormRef = useRef<HTMLFormElement>(null);',
            'const registerFormRef = useRef<HTMLFormElement>(null);' + stateDecls
        );
    }

    // Process each form
    for (const info of formsInfo) {
        // 1. Update the action handler
        // Look for `action={async (formData) => { \n`
        // Note: the exact spacing might vary so we can do a regex or just match string 
        const oldActionStart = `action={async (formData) => { \n`;
        const actionMatch = `action={async (formData) => {`;
        const newActionStart = `action={async (formData) => { \n                      ${info.setStateName}(true);`;
        
        // This is a bit brittle, let's use replace with regex for the action block
        // We know it looks like:
        /*
        action={async (formData) => { 
          const res = await submitFormAction("...", formData); 
          if (res.success) {
            alert("..."); 
            formRef.current?.reset();
          } else {
            alert("Failed to submit form.");
          }
        }}
        */
       
       let formTypeStr = `"${info.formType}"`;
       let searchRegex = new RegExp(`action={async \\(formData\\) => {\\s*const res = await submitFormAction\\(${formTypeStr}, formData\\);`, 'g');
       let replacementStr = `action={async (formData) => {\n                      ${info.setStateName}(true);\n                      const res = await submitFormAction(${formTypeStr}, formData);`;
       
       content = content.replace(searchRegex, replacementStr);

       // Now add the setState(false) at the end.
       // The end of the block is:
       /*
          } else {
            alert("Failed to submit form.");
          }
        }}
       */
       // We can just add it before the closing bracket of the action. Wait, it's safer to just replace `alert("..."); \n                        formRef` and `alert("Failed...");` with `finally`.
       // Actually, we can just replace:
       // `alert("Failed to submit form.");\n                      }\n                    }}`
       // with
       // `alert("Failed to submit form.");\n                      }\n                      ${info.setStateName}(false);\n                    }}`
       // Since formatting varies, let's just do a blanket regex:
       let endActionRegex = /alert\("Failed to submit form\."\);\s*\}\s*\}\}/g;
       // But wait, there might be multiple forms in the same file (Patient Portal).
       // We can match the specific action block using string manipulation.
    }

    // Actually, it's much easier to rewrite the whole action and button logic if we know exactly what they are.
    // Let's do it file by file using precise replacements.
}

function updateFile(path, config) {
    let content = fs.readFileSync(path, 'utf8');

    if (content.includes('import React, { useEffect, useRef } from "react";')) {
        content = content.replace(
            'import React, { useEffect, useRef } from "react";',
            'import React, { useEffect, useRef, useState } from "react";'
        );
    }

    for (let c of config) {
        // Add state
        content = content.replace(c.insertStateAfter, c.insertStateAfter + `\n  const [${c.stateName}, ${c.setStateName}] = useState(false);`);

        // Update action
        content = content.replace(c.oldAction, c.newAction);

        // Update button
        content = content.replace(c.oldButton, c.newButton);
    }

    fs.writeFileSync(path, content, 'utf8');
}

// 1. Contact Us
const contactConfig = [{
    stateName: 'isSubmitting',
    setStateName: 'setIsSubmitting',
    insertStateAfter: 'const formRef = useRef<HTMLFormElement>(null);',
    oldAction: `action={async (formData) => { \n                        const res = await submitFormAction("Contact Us", formData); \n                        if (res.success) {\n                          alert("Form submitted successfully!"); \n                          formRef.current?.reset();\n                        } else {\n                          alert("Failed to submit form.");\n                        }\n                      }}`,
    newAction: `action={async (formData) => { 
                        setIsSubmitting(true);
                        const res = await submitFormAction("Contact Us", formData); 
                        if (res.success) {
                          alert("Form submitted successfully!"); 
                          formRef.current?.reset();
                        } else {
                          alert("Failed to submit form.");
                        }
                        setIsSubmitting(false);
                      }}`,
    oldButton: `<button 
                        type="submit"
                        className="w-full bg-[#002b5c] hover:bg-[#001a38] text-white py-4 rounded-xl font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                      >
                        Submit Request
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>`,
    newButton: `<button 
                        type="submit"
                        disabled={isSubmitting}
                        className={\`w-full bg-[#002b5c] hover:bg-[#001a38] text-white py-4 rounded-xl font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group \${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}\`}
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Submit Request
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>`
}];

updateFile('c:\\\\Users\\\\91870\\\\Desktop\\\\globalwebify\\\\denanath\\\\src\\\\app\\\\contact-us\\\\client-page.tsx', contactConfig);

// 2. Book Appointment
const bookConfig = [{
    stateName: 'isSubmitting',
    setStateName: 'setIsSubmitting',
    insertStateAfter: 'const formRef = useRef<HTMLFormElement>(null);',
    oldAction: `action={async (formData) => { \n                      const res = await submitFormAction("Book Appointment", formData); \n                      if (res.success) {\n                        alert("Form submitted successfully!"); \n                        formRef.current?.reset();\n                      } else {\n                        alert("Failed to submit form.");\n                      }\n                    }}`,
    newAction: `action={async (formData) => { 
                      setIsSubmitting(true);
                      const res = await submitFormAction("Book Appointment", formData); 
                      if (res.success) {
                        alert("Form submitted successfully!"); 
                        formRef.current?.reset();
                      } else {
                        alert("Failed to submit form.");
                      }
                      setIsSubmitting(false);
                    }}`,
    oldButton: `<button 
                        type="submit"
                        className="w-full bg-[#002b5c] hover:bg-[#001a38] text-white py-4 rounded-xl font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                      >
                        Confirm Appointment Request
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>`,
    newButton: `<button 
                        type="submit"
                        disabled={isSubmitting}
                        className={\`w-full bg-[#002b5c] hover:bg-[#001a38] text-white py-4 rounded-xl font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group \${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}\`}
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Confirm Appointment Request
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>`
}];

updateFile('c:\\\\Users\\\\91870\\\\Desktop\\\\globalwebify\\\\denanath\\\\src\\\\app\\\\book-appointment\\\\client-page.tsx', bookConfig);

// 3. Patient Registration
const registrationConfig = [{
    stateName: 'isSubmitting',
    setStateName: 'setIsSubmitting',
    insertStateAfter: 'const formRef = useRef<HTMLFormElement>(null);',
    oldAction: `action={async (formData) => { \n                    const res = await submitFormAction("Patient Registration", formData); \n                    if (res.success) {\n                      alert("Form submitted successfully!"); \n                      formRef.current?.reset();\n                    } else {\n                      alert("Failed to submit form.");\n                    }\n                  }}`,
    newAction: `action={async (formData) => { 
                    setIsSubmitting(true);
                    const res = await submitFormAction("Patient Registration", formData); 
                    if (res.success) {
                      alert("Form submitted successfully!"); 
                      formRef.current?.reset();
                    } else {
                      alert("Failed to submit form.");
                    }
                    setIsSubmitting(false);
                  }}`,
    oldButton: `<button type="submit" className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">\n                          Register Patient\n                          <ArrowRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />\n                        </button>`,
    newButton: `<button 
                          type="submit" 
                          disabled={isSubmitting}
                          className={\`group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 \${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}\`}
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              Register Patient
                              <ArrowRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>`
}];

updateFile('c:\\\\Users\\\\91870\\\\Desktop\\\\globalwebify\\\\denanath\\\\src\\\\app\\\\(online-facilities)\\\\patient-registration\\\\client-page.tsx', registrationConfig);

// 4. Patient Portal
const portalConfig = [
    {
        stateName: 'isLoginSubmitting',
        setStateName: 'setIsLoginSubmitting',
        insertStateAfter: 'const registerFormRef = useRef<HTMLFormElement>(null);',
        oldAction: `action={async (formData) => { \n                          const res = await submitFormAction("Patient Portal Login", formData); \n                          if (res.success) {\n                            alert("Login submitted successfully!"); \n                            loginFormRef.current?.reset();\n                          } else {\n                            alert("Failed to submit form.");\n                          }\n                        }}`,
        newAction: `action={async (formData) => { 
                          setIsLoginSubmitting(true);
                          const res = await submitFormAction("Patient Portal Login", formData); 
                          if (res.success) {
                            alert("Login submitted successfully!"); 
                            loginFormRef.current?.reset();
                          } else {
                            alert("Failed to submit form.");
                          }
                          setIsLoginSubmitting(false);
                        }}`,
        oldButton: `<button type="submit" className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">\n                            Secure Login\n                            <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />\n                          </button>`,
        newButton: `<button 
                              type="submit" 
                              disabled={isLoginSubmitting}
                              className={\`group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 \${isLoginSubmitting ? 'opacity-70 cursor-not-allowed' : ''}\`}
                            >
                              {isLoginSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <>
                                  Secure Login
                                  <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </button>`
    },
    {
        stateName: 'isRegisterSubmitting',
        setStateName: 'setIsRegisterSubmitting',
        insertStateAfter: '  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);',
        oldAction: `action={async (formData) => { \n                          const res = await submitFormAction("Patient Portal Register", formData); \n                          if (res.success) {\n                            alert("Registration submitted successfully!"); \n                            registerFormRef.current?.reset();\n                          } else {\n                            alert("Failed to submit form.");\n                          }\n                        }}`,
        newAction: `action={async (formData) => { 
                          setIsRegisterSubmitting(true);
                          const res = await submitFormAction("Patient Portal Register", formData); 
                          if (res.success) {
                            alert("Registration submitted successfully!"); 
                            registerFormRef.current?.reset();
                          } else {
                            alert("Failed to submit form.");
                          }
                          setIsRegisterSubmitting(false);
                        }}`,
        oldButton: `<button type="submit" className="group w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3.5 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base whitespace-nowrap rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">\n                            Register Account\n                            <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />\n                          </button>`,
        newButton: `<button 
                              type="submit" 
                              disabled={isRegisterSubmitting}
                              className={\`group w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3.5 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base whitespace-nowrap rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 \${isRegisterSubmitting ? 'opacity-70 cursor-not-allowed' : ''}\`}
                            >
                              {isRegisterSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <>
                                  Register Account
                                  <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </button>`
    }
];

updateFile('c:\\\\Users\\\\91870\\\\Desktop\\\\globalwebify\\\\denanath\\\\src\\\\app\\\\(online-facilities)\\\\patient-portal\\\\client-page.tsx', portalConfig);

// 5. Online Payment
const paymentConfig = [{
    stateName: 'isSubmitting',
    setStateName: 'setIsSubmitting',
    insertStateAfter: 'const formRef = useRef<HTMLFormElement>(null);',
    oldAction: `action={async (formData) => { \n                      const res = await submitFormAction("Online Payment", formData); \n                      if (res.success) {\n                        alert("Payment form submitted successfully!"); \n                        formRef.current?.reset();\n                      } else {\n                        alert("Failed to submit form.");\n                      }\n                    }}`,
    newAction: `action={async (formData) => { 
                      setIsSubmitting(true);
                      const res = await submitFormAction("Online Payment", formData); 
                      if (res.success) {
                        alert("Payment form submitted successfully!"); 
                        formRef.current?.reset();
                      } else {
                        alert("Failed to submit form.");
                      }
                      setIsSubmitting(false);
                    }}`,
    oldButton: `<button type="submit" className="group w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-4 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base md:text-lg whitespace-nowrap rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1">\n                        <Lock className="w-5 h-5 shrink-0 text-teal-300" />\n                        Proceed to Pay\n                        <ChevronRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />\n                      </button>`,
    newButton: `<button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={\`group w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-4 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base md:text-lg whitespace-nowrap rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1 \${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}\`}
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Lock className="w-5 h-5 shrink-0 text-teal-300" />
                            Proceed to Pay
                            <ChevronRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>`
}];

updateFile('c:\\\\Users\\\\91870\\\\Desktop\\\\globalwebify\\\\denanath\\\\src\\\\app\\\\(online-facilities)\\\\online-payment\\\\client-page.tsx', paymentConfig);

console.log("Done");
