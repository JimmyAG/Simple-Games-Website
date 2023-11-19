import json
import os

#this class stores created users in JSON file username : password and retrieves them when needed to check for login
class Database:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.path = "./static/JSONs"
        self.db = dict()

        
    def sign_up(self):
        self.db["Username"] = self.username
        self.db["Password"] = self.encrypt_decrypt(self.password, "en")
        
        if os.path.exists(self.path + "/" + self.username + ".json"):
            return "This user already exists, try logging in instead!"
        else:
            with open("%s/%s.json" % (self.path, self.username), "w+") as json_file:
                json.dump(self.db, json_file)

            return "Account created successfully!"
        

    def log_in(self, username, password):
        if os.path.exists(self.path + "/" + self.username + ".json"):
            with open("%s/%s.json" % (self.path, self.username), "r+") as json_file:
                db = json.load(json_file)
                
            stored_password = db["Password"]
            stored_password_decrypted = self.encrypt_decrypt(stored_password, "de")

            if username == db["Username"] and password == stored_password_decrypted:
                return True

            elif username == db["Username"] or password == stored_password_decrypted:
                message = "Username or password is incorrect, please try again"
                return message
        else:
            message = "There are no accounts linked to the username you entered, please try again"
            return message


#This function encrypts or decrypts the password
    def encrypt_decrypt(self, password, action):
        if action == "en":
            new_password =  ''.join(chr(ord(i) - 20) for i in password)
            return new_password
        elif action == "de":
            new_password =  ''.join(chr(ord(i) + 20) for i in password)
            return new_password
