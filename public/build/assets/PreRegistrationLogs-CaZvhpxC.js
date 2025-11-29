import{q as V,r as h,j as e,b as Q}from"./app-Bw7SI7Zc.js";import{A as W}from"./AuthenticatedLayout-CI3V53ad.js";import{S as T}from"./sweetalert2.esm.all-ePrzfkxH.js";import{B as J}from"./button-DfuBJou0.js";import{L as Y}from"./layout-dashboard-CYlHiTZm.js";import{a as G,C as K}from"./chevron-right-DLYcjkjm.js";import{S as C}from"./search-4Os3sXOG.js";import{B as X,H as Z}from"./hash-jwVQodHO.js";import{c as ee}from"./createLucideIcon-ZzUTTAV8.js";import{F as te}from"./funnel-CtTDpNUC.js";import{U as se}from"./user-DHJgBjiT.js";import{C as re}from"./clock-BTwJj73m.js";import{E as ae}from"./eye-BvcIt5V3.js";import"./transition-Cvj0qrZa.js";import"./render-CkrE6gxv.js";import"./index-BhOk6Dy5.js";import"./clsx-B-dksMZM.js";import"./utils-CP3_-lCt.js";/**
 * @license lucide-react v0.507.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=[["path",{d:"M2 21a8 8 0 0 1 13.292-6",key:"bjp14o"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"m16 19 2 2 4-4",key:"1b14m6"}]],ne=ee("user-round-check",le),$e=ie=>{var F;const R=V(),{logs:q,lobbies:g,auth:oe,personFiles:de}=R.props,[y,I]=h.useState(""),[b,D]=h.useState("all"),[m,j]=h.useState(null),[L,M]=h.useState(""),[u,z]=h.useState(!1),[k,P]=h.useState([]);h.useEffect(()=>{g&&g.length>0&&(P(g),!m&&g[0]&&j(g[0].id))},[g]);const $=k.filter(t=>t.name.toLowerCase().includes(L.toLowerCase())),A=q||[],U=t=>t?new Date(t).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}):"Active Session",d=A.filter(t=>{var l,a;if(m&&t.lobby_id!==m)return!1;const s=(((l=t.participant)==null?void 0:l.team)||"").toString().trim().toLowerCase().includes(y.trim().toLowerCase())||(((a=t.participant)==null?void 0:a.team_leader)||"").toString().trim().toLowerCase().includes(y.trim().toLowerCase());return b==="all"?s:b==="active"?s&&t.status===2:b==="ended"?s&&t.status===1:s}),N=t=>!t||typeof t!="string"?"":t.startsWith("http://")||t.startsWith("https://")||t.startsWith("/")?t:"/storage/"+t,_=(t=[])=>{if(!Array.isArray(t)||t.length===0)return`
        <div class="mb-2 p-2 text-sm text-gray-600 italic">No files uploaded.</div>
      `;const s={studentId:"Valid Student ID",registrationForm:"Certificate of Registration Form",consentForm:"Signed Consent Form"};return t.map(l=>{const a=l.url||"",x=(l.name||"Untitled").replace(/\s*\(.*?\)\s*/,""),c=s[x]||x,f=(a.split(".").pop()||"").toLowerCase();if(!a||a==="null"||a==="undefined"||a.trim()===""||a.includes("null")||a.includes("undefined"))return`
          <div class="file-card">
            <h4>${c}</h4>
            <div>No file uploaded ❌</div>
          </div>
        `;const v=f==="pdf",w=["jpg","jpeg","png","gif","webp","svg"].includes(f);return v?`
          <div class="file-card w-1/3 p-2">
            <div class="file-inner">
              <h4 class="file-title text-black">${c}</h4>
      
              <iframe 
                src="${a}" 
                class="rounded-lg shadow-sm mb-2" 
                style="width:100%; height:200px;">
              </iframe>
      
              <button 
                onclick="window.open('${a}', '_blank')" 
                class="w-full bg-orange-500 text-white py-1.5 rounded-lg text-sm hover:bg-orange-600 transition">
                View Full PDF
              </button>
      
            </div>
          </div>
        `:w?`
          <div class="file-card w-1/3 p-2">
            <div class="file-inner">
              <h4 class="file-title text-black mb-2">${c}</h4>
      
              <!-- image + centered tooltip wrapper -->
              <div class="relative group rounded-lg overflow-hidden" style="width:100%; height:200px;">
                <img
                  src="${a}"
                  class="file-image w-full h-full object-cover cursor-pointer"
                  onclick="window.open('${a}', '_blank')"
                  alt="${c}"
                />
      
                <!-- Centered tooltip (non-interactive so clicks go to the image) -->
                <span class="absolute inset-0 flex items-center justify-center
                             text-white text-sm bg-orange-500 bg-opacity-80
                             opacity-0 group-hover:opacity-100 transition
                             pointer-events-none">
                  Click to see full size
                </span>
              </div>
            </div>
          </div>
        `:`
        <div class="w-1/3 p-2 text-center">
          <h4 class="font-semibold text-gray-700 mb-2">${c}</h4>
          <p class="text-gray-600 mb-2">File type not supported for preview</p>
          <a href="${a}" target="_blank" class="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Download File</a>
        </div>
      `}).join("")},B=t=>{const s=t.participant||{};let l=[];try{const r=s.members||"[]";l=Array.isArray(r)?r:JSON.parse(r||"[]"),Array.isArray(l)||(l=[])}catch(r){console.error("Error parsing members JSON:",r),l=[]}const a=[];s.requirements&&typeof s.requirements=="object"?Object.entries(s.requirements).forEach(([r,n])=>{const i=N(String(n||"")),o=(i.split(".").pop()||"").toLowerCase()==="pdf"?"pdf":"image";a.push({name:`${r} (${s.team_leader||"Team Leader"})`,url:i,type:o})}):[{label:"Valid Student ID",value:s.student_id||s.student_number||void 0},{label:"Certificate of Registration Form",value:s.registration_form||void 0},{label:"Signed Consent Form",value:s.consent_form||void 0}].forEach(n=>{if(n.value){const i=N(String(n.value)),o=(i.split(".").pop()||"").toLowerCase()==="pdf"?"pdf":"image";a.push({name:`${n.label} (${s.team_leader||"Team Leader"})`,url:i,type:o})}}),l.forEach(r=>{const n=r.requirements||{};Object.entries(n).forEach(([i,o])=>{const p=N(String(o||"")),S=(p.split(".").pop()||"").toLowerCase()==="pdf"?"pdf":"image",E=r.name||"Member";a.push({name:`${i} (${E})`,url:p,type:S})})});const x=a.reduce((r,n)=>{var p;const i=(p=n.name)==null?void 0:p.match(/\((.*?)\)/),o=i?i[1]:"Unknown";return r[o]||(r[o]=[]),r[o].push(n),r},{}),c=`
      <div class="p-4 border-2 rounded-lg bg-orange-50 mb-4">
        <h2 class="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
          Team Leader Information
        </h2>

        <p class="flex items-center gap-2 text-black"><strong>Full Name:</strong> ${s.team_leader||"N/A"}</p>
        <p class="flex items-center gap-2 mt-2 text-black"><strong>Student ID:</strong> ${s.student_number||s.student_id||"N/A"}</p>
        <p class="flex items-center gap-2 mt-2 text-black"><strong>Section:</strong> ${s.course_year||s.section||"N/A"}</p>
        <p class="flex items-center gap-2 mt-2 text-black"><strong>Email:</strong> ${s.team_leader_email||s.email||"N/A"}</p>
        <p class="flex items-center gap-2 mt-2 text-black"><strong>Contact Number:</strong> ${s.contact_number||"N/A"}</p>
      </div>
    `,f=s.team_leader||"Team Leader",v=x[f]||[],w=`
      <div class="mb-6 p-4 border rounded-lg bg-orange-50">
        <h3 class="text-xl font-bold text-orange-600 mb-4">Submitted Requirements (Team Leader)</h3>
        <div class="flex flex-wrap -m-2">
          ${_(v)}
        </div>
      </div>
    `,O=l.map((r,n)=>{const i=r.name||"N/A",o=r.studentNumber||r.student_number||"N/A",p=r.courseYear||r.course_year||"N/A",S=x[i]||[];return`
        <div class="p-4 border-2 rounded-lg bg-orange-50 mb-4">
          <h2 class="text-2xl font-bold text-orange-600 mb-3">Member No. ${n+1} Information</h2>
          <p class="text-black"><strong>Full Name:</strong> ${i}</p>
          <p class="mt-1 text-black"><strong>Student ID:</strong> ${o}</p>
          <p class="mt-1 text-black"><strong>Section:</strong> ${p}</p>
        </div>

        <div class="p-4 border rounded-lg bg-orange-50 mb-6">
          <h3 class="text-xl font-bold text-orange-600 mb-4">Submitted Requirements (Member)</h3>
          <div class="flex flex-wrap -m-2 ">
            ${_(S)}
          </div>
        </div>
      `}).join(""),H=`
      ${w}
      ${O}
    `;T.fire({title:`
        <span class="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
          Participant Information
        </span>
      `,html:`
        <div style="max-height:600px; overflow-y:auto; text-align:left;">
          ${c}
          ${H}
        </div>
      `,width:"80%",showCloseButton:!0,showConfirmButton:!1,customClass:{popup:"swal-wide",htmlContainer:"swal-html-container"},didOpen:()=>{const r=T.getPopup();r==null||r.querySelectorAll("iframe").forEach(n=>{n.setAttribute("sandbox","allow-same-origin allow-scripts allow-popups")})}})};return e.jsx(W,{children:e.jsx("div",{className:"min-h-screen bg-white p-6",children:e.jsxs("div",{className:"w-full max-w-full flex flex-col",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("h1",{className:"text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent",children:"Pre Registration Logs"}),e.jsx("p",{className:"text-gray-600",children:"Monitor and track Pre Registration activity"})]}),e.jsxs("div",{onClick:()=>Q.get("/organizerLobby"),className:"bg-red-500 text-white p-4 flex gap-x-3 rounded-md hover:bg-red-700 hover:cursor-pointer",children:[e.jsx(Y,{}),e.jsx("p",{children:"Go to Dashboard"})]})]}),e.jsxs("div",{className:"flex flex-col lg:flex-row gap-6",children:[e.jsx("div",{className:`${u?"w-12":"w-80"} flex-shrink-0 transition-all duration-300 overflow-hidden`,children:e.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl h-full relative",children:[e.jsx("button",{onClick:()=>z(!u),className:"p-2 hover:bg-gray-100 rounded-lg transition-colors absolute top-4 right-4",type:"button",title:u?"Expand sidebar":"Collapse sidebar",children:u?e.jsx(G,{className:"w-5 h-5 text-gray-600"}):e.jsx(K,{className:"w-5 h-5 text-gray-600"})}),!u&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"text-xl font-bold text-red-600 mb-2",children:"Quiz Event"}),e.jsx("p",{className:"text-sm text-gray-600 mb-4",children:"Select a quiz event to filter logs"}),e.jsxs("div",{className:"relative mb-4",children:[e.jsx("input",{type:"text",placeholder:"Search quiz event...",className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-0 focus:ring-orange-400 focus:border-orange-400",value:L,onChange:t=>M(t.target.value)}),e.jsx(C,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"})]}),e.jsxs("div",{className:"space-y-2 max-h-96 overflow-y-auto",children:[e.jsx("button",{onClick:()=>j(null),className:`w-full text-left px-4 py-3 rounded-lg transition-colors ${m===null?"bg-orange-500 text-white":"bg-gray-50 hover:bg-gray-100 text-gray-900"}`,type:"button",children:"All Event Quiz Sessions"}),$.length===0?e.jsx("p",{className:"text-gray-500 text-sm text-center py-4",children:"No quiz events found"}):$.map(t=>e.jsx("button",{onClick:()=>j(t.id),className:`w-full text-left px-4 py-3 rounded-lg transition-colors ${m===t.id?"bg-orange-500 text-white":"bg-gray-50 hover:bg-gray-100 text-gray-900"}`,type:"button",children:t.name},t.id))]})]})]})}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ",children:[e.jsx("div",{className:"bg-white rounded-xl shadow-lg border border-red-300 border-l-4 border-l-red-500 p-6",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Rejected"}),e.jsx("p",{className:"text-2xl font-bold text-gray-900",children:d==null?void 0:d.filter(t=>t.status==1).length})]}),e.jsx("div",{className:"p-3 bg-red-100 rounded-full",children:e.jsx(X,{className:"w-6 h-6 text-red-600"})})]})}),e.jsx("div",{className:"bg-white rounded-xl shadow-lg border border-green-300 border-l-4 border-l-green-500 p-6",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Approved"}),e.jsx("p",{className:"text-2xl font-bold text-gray-900",children:d==null?void 0:d.filter(t=>t.status==2).length})]}),e.jsx("div",{className:"p-3 bg-green-100 rounded-full",children:e.jsx(ne,{className:"w-6 h-6 text-green-600"})})]})})]}),e.jsx("div",{className:"bg-white rounded-xl border border-gray-300 shadow-lg p-6 mb-6",children:e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md ",children:[e.jsx(C,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),e.jsx("input",{type:"text",placeholder:"Search by team name or team leader name...",className:"w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-0 focus:ring-orange-400 focus:border-orange-400 transition-colors",value:y,onChange:t=>I(t.target.value)})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(te,{className:"w-5 h-5 text-gray-500"}),e.jsxs("select",{className:"border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white",value:b,onChange:t=>D(t.target.value),children:[e.jsx("option",{value:"all",children:"All Logs"}),e.jsx("option",{value:"active",children:"Approved Only"}),e.jsx("option",{value:"ended",children:"Rejected Only"})]})]})]})}),e.jsxs("div",{className:"bg-white rounded-xl shadow-lg border border-gray-300 p-6 overflow-hidden",children:[e.jsxs("div",{className:"p-4 border-b border-gray-500 flex items-center gap-2",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"Pre Registration Logs"}),m&&e.jsxs("span",{className:"text-sm text-gray-600",children:["- ",((F=k.find(t=>t.id===m))==null?void 0:F.name)||""]})]}),e.jsx("div",{className:"overflow-x-auto pb-4",children:e.jsxs("table",{className:"w-full table-auto",children:[e.jsx("thead",{className:"bg-gradient-to-r from-red-500 to-amber-500",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-6 py-4 text-left text-sm font-semibold text-white",children:"Team Name"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-semibold text-white",children:"Team Leader"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-semibold text-white",children:"Email"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-semibold text-white",children:"Contact Number"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-semibold text-white",children:"Status"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-semibold text-white",children:"Reject / Approved Date"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-semibold text-white",children:"View"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-semibold text-white",children:"Comment"})]})}),e.jsx("tbody",{className:"divide-y divide-gray-200",children:d.map((t,s)=>{var l,a,x,c;return e.jsxs("tr",{className:`hover:bg-red-50 transition-colors duration-200 ${s%2===0?"bg-white":"bg-gray-50"}`,children:[e.jsx("td",{className:"px-6 py-4",children:e.jsx("div",{className:"flex items-center w-fit truncate",children:e.jsx("div",{className:"max-w-[150px] px-3 truncate h-8 bg-gradient-to-r from-red-400 to-amber-400 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3",children:((l=t.participant)==null?void 0:l.team)||"N/A"})})}),e.jsx("td",{className:"px-6 py-4",children:e.jsxs("div",{className:"flex items-center w-fit truncate",children:[e.jsx(se,{className:"w-4 h-4 text-gray-400 mr-2"}),e.jsx("span",{className:"text-gray-900 font-medium",children:((a=t.participant)==null?void 0:a.team_leader)||"N/A"})]})}),e.jsx("td",{className:"px-6 py-4",children:e.jsx("span",{className:"text-gray-900 font-medium break-words",children:((x=t.participant)==null?void 0:x.team_leader_email)||"N/A"})}),e.jsx("td",{className:"px-6 py-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx(Z,{className:"w-4 h-4 text-gray-400 mr-2 flex-shrink-0"}),e.jsx("span",{className:"text-gray-900 font-mono break-words",children:((c=t.participant)==null?void 0:c.contact_number)||"N/A"})]})}),e.jsx("td",{className:"px-6 py-4",children:e.jsx("span",{className:`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${t.status===1?"bg-red-100 text-red-800":"bg-blue-100 text-blue-800"}`,children:t.status===1?"Rejected":"Approved"})}),e.jsx("td",{className:"px-6 py-4",children:e.jsxs("div",{className:"flex items-center w-fit truncate",children:[e.jsx(re,{className:"w-4 h-4 text-gray-400 mr-2"}),e.jsx("span",{className:"text-gray-900 text-sm",children:U(t.created_at)})]})}),e.jsx("td",{className:"px-6 py-4",children:e.jsxs(J,{size:"sm",className:"bg-green-600 hover:bg-green-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",type:"button",disabled:!t.participant,onClick:()=>B(t),children:[e.jsx(ae,{className:"w-4 h-4 text-white"}),e.jsx("span",{children:"View"})]})}),e.jsx("td",{className:"px-6 py-4",children:e.jsx("span",{className:"text-gray-900 text-sm w-fit truncate",children:t.comment})})]},t.id)})})]})}),d.length===0&&e.jsxs("div",{className:"text-center py-12",children:[e.jsx("div",{className:"w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx(C,{className:"w-8 h-8 text-red-500"})}),e.jsx("h3",{className:"text-lg font-medium text-gray-900 mb-2",children:"No sessions found"}),e.jsx("p",{className:"text-gray-500",children:"Try adjusting your search criteria or filters."})]})]}),e.jsx("div",{className:"mt-8 text-center",children:e.jsxs("p",{className:"text-gray-500 text-sm",children:["Showing ",d.length," of ",m?d.length:A.length," sessions"]})})]})]})]})})})};export{$e as default};
