import sys
import random


class A:
    def __init__(self, name = "joe", email = "") -> None:
        self.name  = name
        self.email = email

    @property
    def commit(self):
        return self.__commit
     
    @commit.setter
    def commit(self, value):
      self.__commit = value
    
    def name(self):
        return self.name

    def email(self):
        return self.email


