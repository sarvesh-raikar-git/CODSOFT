import random
import re

class SupportBot:
    negative_res = ("no", "nope", "not a chance", "nay", "sorry", "none", "nothing")
    exit_commands = ("quit", "pause", "exit", "goodbye", "bye", "farewell")

    def __init__(self):
        self.support_responses = {
            'ask_about_product': r'.*\s*product*.',
            'technical_support': r'.*technical.*support.*',
            'about_returns': r'.*\s*returnpolicy.*',
            'general_query': r'.*how.*help.*'
        }

    def greet(self):
        self.name = input("Hello! Welcome to customer support, what is your name?\n")
        will_help = input(f"Hi {self.name}, how may I help you today? ")
        if will_help in self.negative_res:
            print("Alright, have a great day!")
            return
        self.chat()

    def make_exit(self, reply):
        for command in self.exit_commands:
            if command in reply:
                print("Thanks for reaching out. Have a great day!")
                return True
        return False

    def chat(self):
        reply = input("Please tell me your query: ").lower()
        while not self.make_exit(reply):
            print(self.match_reply(reply))
            reply = input("Anything else you would like to ask? ")

    def match_reply(self, reply):
        for intent, regex_pattern in self.support_responses.items():
            found_match = re.search(regex_pattern, reply)
            if found_match and intent == 'ask_about_product':
                return self.ask_about_product()
            elif found_match and intent == 'technical_support':
                return self.technical_support()
            elif found_match and intent == 'about_returns':
                return self.about_returns()
            elif found_match and intent == 'general_query':
                return self.general_query()
        return self.no_match_intent()

    def ask_about_product(self):
        responses = ["Our product is top-notch and has excellent reviews.",
                     "You can find all product details on our website."]
        return random.choice(responses)

    def technical_support(self):
        responses = ["Please visit our technical support page for detailed assistance.",
                     "You can also call our tech support helpline for immediate help."]
        return random.choice(responses)

    def about_returns(self):
        responses = ["We have a 30-day return policy.",
                     "Please ensure the product is in its original condition when returning."]
        return random.choice(responses)

    def general_query(self):
        responses = ["I'm here to help. Please provide more details about your query.",
                     "Could you please give more information so that I can assist you better?"]
        return random.choice(responses)

    def no_match_intent(self):
        responses = ["I am sorry, I didn't understand that. Can you please rephrase?",
                     "My apologies, can you provide more details?"]
        return random.choice(responses)

bot = SupportBot()
bot.greet()
