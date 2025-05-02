export class ResetPasswordRequestDTO {
    email: string;
    oldPwd: string;
    newPwd: string;
    confirmPwd: string;
  
    constructor(email: string, oldPwd: string, newPwd: string, confirmPwd: string) {
      this.email = email;
      this.oldPwd = oldPwd;
      this.newPwd = newPwd;
      this.confirmPwd = confirmPwd;
    }
  }
  