import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";

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
import { getUser, signUp } from "../../service/users";
import { hashData } from "../../util/security";

export default function SignUpForm() {
  const [formState, setFormState] = useState({});
  const [disable, setDisable] = useState(true);

  const [user, setUser] = useState(getUser);
  const navigate = useNavigate();

  function handleChange(evt) {
    var currForm = formState;
    // console.log(currForm);
    currForm[evt.target.name] = evt.target.value;
    setDisable(checkPassword());
    setFormState(currForm);
  }

  // make sure check and password is the same
  function checkPassword() {
    // password validation
    // must have at least 1 uppercase, 1 lowercase, 1 special
    var currForm = formState;
    if (!currForm.password) {
      return true;
    }
    if (!currForm.confirm) {
      return true;
    }
    if (currForm.password !== currForm.confirm) {
      return true;
    }
    return false;
  }

  function hashPassword() {
    var currForm = formState;
    if (currForm.password) {
      // console.log(currForm);
      
      var hash = hashData(currForm.password);
      // console.log(hash);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      // highlight-start
      hashPassword();
      const formData = { ...formState };
      delete formData.error;
      delete formData.confirm;
      // highlight-end
      // console.log(formData);
      const user = await signUp(formData);
      // Baby step!
      // console.log(user);
      // Navigate to the home page if sign up was successful
    if (user.success) {
      navigate("/login");
    }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
    {user ? (
      <Navigate to="/" />
    ) : (
    <Card className="mx-auto max-w-sm">
        <form onSubmit={handleSubmit}></form>
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Max"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Robinson"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card> )}
    </>
  );
}
