import emailImage from '../assets/email.svg';

function ResetEmailComponent() {
  return(
    <>
      <img src={emailImage}/>
      <h2 style={{ textAlign: 'center' }}>メールの送信が</h2>
      <h2 style={{ textAlign: 'center' }}>完了しました</h2>
      <h6 style={{ textAlign: 'center' }}>パスワード再設定ページへのリンクを</h6>
      <h6 style={{ textAlign: 'center' }}>記載したメールをお送りしました。</h6>
    </>
  )
}

export default ResetEmailComponent;