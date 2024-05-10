import "./Login.style.scss";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputText from "src/common/controls/InputText";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Login.style.scss";
import InputPassword from "src/common/controls/InputPassword";
import { message } from "antd";


export const LoginView = (props: any) => {
  return (
    
  <div className="form-login">

    <FieldGroup
      control={props.myForm}
      render={({ get, invalid }) => (
      
        <form>
          <center>
            <h2>Đăng nhập admin</h2>
            <div className="col-md-4" >
              <FieldControl
                name="soDienThoai"
                meta={{ label: "Tài khoản" }}
                render={InputText}
              />
            </div>
<br />
            <div className="col-md-4">
              <FieldControl
                name="password"
                meta={{ label: "Mật khẩu" }}
                render={InputPassword}
              />
            </div>
          </center>

          <div className="list-control-search">

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => props.save()}
              disabled={props.disabled}
            >
              Đăng nhập
            </button >


          </div >
        </form >
      )}
    />
  </div>);
}

export default LoginView;
