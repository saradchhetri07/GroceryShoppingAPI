import { NextFunction, Request, Response } from "express";
import { StatusCodes as HTTPStatusCodes } from "http-status-codes";
import * as AuthServices from "../services/auth.services";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import config from "../config";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    //retrieving email if it exists
    const existingUser = await AuthServices.getUserByEmail(body.email, "login");

    //comparing if user password matches
    const isValidUser = await bcrypt.compare(
      body.password,
      existingUser!.password
    );

    if (!isValidUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    const accessToken = sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.accessTokenExpiryMS,
    });

    const refreshToken = sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.refreshTokenExpiryMS,
    });

    return res
      .status(HTTPStatusCodes.OK)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    //check if user already exists
    const existingUser = await AuthServices.getUserByEmail(
      body.email,
      "signup"
    );

    if (existingUser) {
      throw new Error("User already exists with that email");
    }

    const users = await AuthServices.signUp(body);

    if (users === undefined) {
      throw new Error("SignUp failed");
    }

    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: "Sign Up successful" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};
