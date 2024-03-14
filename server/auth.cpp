#include <iostream>
#include <string>
#include <list>
#include <array>

int main(int argc, char *argv[])
{
    // bad init
    if (argc < 2) {
        return 1; // return False
    }

    std::string input = argv[1]; // argument
    std::array<std::string, 3> passwords = {"password1", "password2", "password3"}; // passwords
    std::list<std::string> saved_list(passwords.begin(), passwords.end()); // converts list items to strings for eval
    for (std::list<std::string>::iterator it = saved_list.begin(); it != saved_list.end(); ++it) { // for strings
        if (input == *it) { // if input matches string
            return 0; // return True
        }
    }
    return 1; // return False
}
// g++ -o auth server/auth.cpp