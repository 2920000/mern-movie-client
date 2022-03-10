// import React, { memo } from "react";
// const validate = (inputElement, rule,formElement) => {
//     const errorMessage = rule.checkCondition(inputElement.value);
//     const errorElement =
//       inputElement.parentElement.querySelector(".error-message");
//     if (errorMessage) {
//       errorElement.innerHTML = errorMessage;
//       inputElement.classList.add("error-color");
//     } else {
//       inputElement.classList.remove("error-color");
//       errorElement.innerHTML = "";
//     }
//   };


// const validateForm = (formId, rules) => {
//   const formElement = document.querySelector(`#${formId}`);
 
//   if (formElement) {
//     formElement.onsubmit=(e)=>{
//         e.preventDefault( )
//         console.log('oke')
//     }
//     rules.forEach((rule) => {
//       const inputElement = formElement.querySelector(`#${rule.selector}`);
//       inputElement.onblur = () => {
//         validate(inputElement, rule,formElement);
//       };
//       inputElement.oninput=()=>{
//         const errorElement =
//         inputElement.parentElement.querySelector(".error-message");
//         errorElement.innerHTML=''
//       inputElement.classList.remove("error-color");

//       }
//     });
//   }
// };
// validateForm.isRequired = function (selector) {
//   return {
//     selector,
//     checkCondition: (value) => {
//       return value.trim() ? undefined : "Bạn chưa nhập dữ liệu";
//     },
//   };
// };
// validateForm.isEmail = function (selector) {
//   return {
//     selector,
//     checkCondition: (value) => {
//         const regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//         if(value.trim().length===0){
//         return value.trim() ? undefined : "Bạn chưa nhập dữ liệu";
//         }
//         return  regex.test(value)?undefined:'Vui lòng nhập đúng email'
//     },
//   };
// };
// validateForm.minLength = function (selector,min) {
//     return {
//       selector,
//       checkCondition: (value) => {
//        if(value.trim()){
//         return value.length>5?undefined:'Bạn cần nhập trên 6 ký tự'
//        }
//        else{
//         return value.trim() ? undefined : "Bạn chưa nhập dữ liệu";
//        }
//       },
//     };
//   };

//   validateForm.confirmPassword = function (selector,confirmPassword) {
//     return {
//       selector,
//       checkCondition: (value) => {
//        if(!value.trim()){
//         return  "Bạn chưa nhập dữ liệu";
//        }else if(value!==confirmPassword()){
//         return  "Mật khẩu chưa khớp";
           
//        }
//       },
//     };
//   }; 
// export default validateForm;
