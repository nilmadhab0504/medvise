"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import withOutAuth from "@/middleware/withOutAuth";

interface LoginData {
  email: string;
  password: string;
  role: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "", role: "doctor" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const setRole = (role: string) => {
    setFormData((prevData) => ({ ...prevData, role }));
    setError(null);
  };

  const handleSubmit = async () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email is invalid");
      return;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess("Login successful! Redirecting...");
        // setTimeout(() => {
        //   router.push("/");
        // }, 30000); // 3 seconds delay
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-4">Login</CardTitle>
          <div className="flex justify-center space-x-4">
            <Button
              type="button"
              variant={formData.role === "doctor" ? "default" : "outline"}
              onClick={() => setRole("doctor")}
            >
              Doctor
            </Button>
            <Button
              type="button"
              variant={formData.role === "admin" ? "default" : "outline"}
              onClick={() => setRole("admin")}
            >
              Admin
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {success && <p className="text-sm text-green-500 mt-2">{success}</p>}
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="button" onClick={handleSubmit}>
            Login as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default withOutAuth(LoginPage);
