import { useRouter } from "next/router";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { email } = router.query; // Lấy email từ URL

  return (
    <div>
      <h1>📩 Kiểm tra email của bạn!</h1>
      <p>
        Chúng tôi đã gửi một email xác nhận đến: <strong>{email}</strong>
      </p>
      <p>Vui lòng nhấn vào link trong email để xác nhận tài khoản.</p>
      <button onClick={() => router.push("/login")}>Quay lại trang đăng nhập</button>
    </div>
  );
};
export default VerifyEmailPage;
