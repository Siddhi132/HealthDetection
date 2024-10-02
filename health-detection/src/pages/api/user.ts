import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/userModel";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        res.status(400).json({ error: "Organization user does not exist" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid password" });
        return null;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch organization users" + error });
    }
  }
  if (req.method === "POST") {
    const { name, username, password } = req.body;
    try {
      const ExistedUser = await User.findOne({
        username: username
      });
      if (ExistedUser) {
        res.status(400).json({ error: "User exist with same username exist. Try something else" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        username,
        password: hashedPassword
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create organization user" + error });
    }
  }
  if (req.method === "PUT") {
    const { _id, name, username } = req.body;
    try {
      const updatedUser = await User.updateOne(
        { _id },
        {
          name,
          username
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update organization user" + error });
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      const deletedUser = await User.deleteOne({ _id: id });
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete organization user" + error });
    }
  }
}

export async function verifyUser(username: string, password: string) {
  await connectToDatabase();
  console.log("username :>> ", username);
  try {
    console.log(username, password);
    const currUser = await User.findOne({ username });
    if (!currUser) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, currUser.password);
    if (!isMatch) {
      return null;
    }
    console.log("logged in user :>> ", currUser);
    return currUser || null;
  } catch (error) {
    console.error("Error verifying user:", error);
    return null;
  }
}
