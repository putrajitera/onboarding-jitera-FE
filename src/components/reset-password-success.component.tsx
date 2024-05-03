import emailImage from '../assets/email.svg';

function ResetPasswordComponent() {
  return(
    <>
      <img src={emailImage}/>
      <h2 style={{ textAlign: 'center' }}>メールをご確認下さい</h2>
      <h6 style={{ textAlign: 'center' }}>メールアドレスに認証リンクが記載されています。</h6>
    </>
  )
}

export default ResetPasswordComponent;