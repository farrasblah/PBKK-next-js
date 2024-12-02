import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div style={styles.container}>
      <SignIn />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Tinggi penuh layar
    backgroundColor: "#f5f5f5", // Warna latar belakang opsional
  },
};

export default SignInPage;