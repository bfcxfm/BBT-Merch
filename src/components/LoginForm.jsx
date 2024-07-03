import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  getLoginDetails,
  loginUser,
  checkLogin,
  checkPermission,
} from "/service/users";
import { hashDataWithSaltRounds, storeToken } from "/util/security";
import { useState } from "react";

export default function LoginForm() {
  const [formState, setFormState] = useState({});

  function handleChange(evt) {
    var currForm = formState;
    currForm[evt.target.name] = evt.target.value;
    setFormState(currForm);
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      // highlight-start
      const formData = { ...formState };
      delete formData.error;
      delete formData.confirm;
      // highlight-end
      console.log(formData);
      // get user salt and iterations from database
      const loginDetails = await getLoginDetails(formData.email);
      console.log(loginDetails.data.salt);
      const hashedPassword = hashDataWithSaltRounds(
        formData.password,
        loginDetails.data.salt,
        loginDetails.data.iterations
      );
      console.log(hashedPassword);
      formData.password = hashedPassword;
      console.log(formData);
      const token = await loginUser(formData);
      // store token in localStorage
      console.log(token);
      storeToken(token);
      // Baby step!
    } catch (e) {
      console.log(e);
    }
  }

  async function handleCheckLogin() {
    await checkLogin();
  }
  async function handleCheckPermission() {
    await checkPermission();
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            {/* <button type="submit" onClick={handleCheckLogin}>
              Check Login
            </button>
            <button type="submit" onClick={handleCheckPermission}>
              Check Permissions
            </button> */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
