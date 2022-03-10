import axios from "axios";

const customError = (inputElement, textCustomError) => {
  inputElement.nextSibling.innerHTML = textCustomError;
  inputElement.style.outline = "2px solid red";
  inputElement.nextSibling.style.color = "red";
};

// function chứa switch để xử lý theo điều kiện của input
function switchResult(rule, value, inputElement) {
  const rulePasswordArray = rule.split(":");
  const textRule = rulePasswordArray[0];
  const numberRulePassword = parseInt(rulePasswordArray[1]);
  switch (textRule) {
    case "required":
      if (!value) {
        customError(inputElement, "Bạn chưa nhập dữ liệu");
        return "checked";
      }
      inputElement.nextSibling.innerHTML = "";
      inputElement.style.outline = "1px solid #B5B5B5";

      break;

    case "email":
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(value)) {
        customError(inputElement, "Hãy nhập đúng định dạng");
        return "checked";
      }
      inputElement.nextSibling.innerHTML = "";
      inputElement.style.outline = "1px solid #B5B5B5";

      break;
    case "minPassword":
      if (value.length < numberRulePassword) {
        customError(inputElement, "Bạn cần nhập hơn 6 ký tự");
        return "checked";
      }
      inputElement.nextSibling.innerHTML = "";
      inputElement.style.outline = "1px solid #B5B5B5";
      break;
    case "confirmPassword":
      const valuePassword = document.querySelector("#password").value;
      const valueConfirmPassword =
        document.querySelector("#confirmPassword").value;
      if (valuePassword !== valueConfirmPassword) {
        customError(inputElement, "Mật khẩu chưa trùng khớp");
        return "checked";
      }
      inputElement.nextSibling.innerHTML = "";
      inputElement.style.outline = "1px solid #B5B5B5";

      break;
    default:
  }
}

const validateForm2 = (formSelector,setSwitchForm,setCheckAccount,setLoginModal,setUser,setSignupSuccess) => {
  
  const formElement = document.querySelector(`#${formSelector}`);
  let isSubmitData=false
  let status=null
  if (formElement) {
    const input = formElement.querySelectorAll("[name][rules]");
  //  console.log( input)
  //  console.log(formElement)
  formElement.onsubmit = async(e) => {
        e.preventDefault();
        // checkConditionFunction()
        for (let i = 0; i < input.length; i++) {
            const inputElement = input[i];
            const rulesOfInputString = input[i].getAttribute("rules");
            const rulesOfInputArray = rulesOfInputString.split("|");
            const value = input[i].value;
             /// check khi kích submit
                for (let i = 0; i < rulesOfInputArray.length; i++) {
                    const rule = rulesOfInputArray[i];
                    const switchValue = switchResult(rule, value, inputElement);
                    if (switchValue) {
                        isSubmitData=false
                      break;
                    }
                    else{
                        isSubmitData=true
                    }
                  }
            }
            if(isSubmitData){
             const userSignupData={}
         for (let i = 0; i < input.length; i++) {
             userSignupData[input[i].name]=input[i].value             
         }
         if(setCheckAccount){
          setCheckAccount(true)
         }
          axios({
             method:'post',
             url:`http://localhost:5000/user/${formSelector.slice(0,6)}`,
             data:userSignupData
         })
         .then(res=>{
           if(formSelector==='signin-form'){
            window.location.reload()
            setCheckAccount(false)
            setLoginModal(false)
            sessionStorage.setItem('profile',JSON.stringify(res.data))
            setUser(JSON.parse(sessionStorage.getItem('profile')))
           }else{
            setSignupSuccess(true)
          }
           window.location.reload()
         }
         )
        .catch(err=>{
          // setCheckAccount(false)
          const inputId=err.response.data.inputName
          const errorMessage=err.response.data.message
          const errorElement=document.querySelector(`#${inputId}`)
          errorElement.nextSibling.innerHTML=errorMessage
          errorElement.nextSibling.style.color='red'

        })
         
        //  setSwitchForm(false)    

            }
            // window.location.reload()
      };


      for (let i = 0; i < input.length; i++) {
        const inputElement = input[i];
        const rulesOfInputString = input[i].getAttribute("rules");
        const rulesOfInputArray = rulesOfInputString.split("|");
        const value = input[i].value;
       
        /// onblur
        inputElement.onblur = () => {
        
          const value =inputElement.value
          for (let i = 0; i < rulesOfInputArray.length; i++) {
            const rule = rulesOfInputArray[i];
            const switchValue = switchResult(rule, value, inputElement);
            if (switchValue) {
              break;
            }
          }
        };
        //// oninput
        inputElement.oninput = () => {
          const value = inputElement.value;
          for (let i = 0; i < rulesOfInputArray.length; i++) {
            const rule = rulesOfInputArray[i];
            const switchValue = switchResult(rule, value, inputElement);
            if (switchValue) {
              break;
            }
          }
        };
      }
    
  }
 
};
export default validateForm2;
