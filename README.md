# LSDLE

Welcome to **LSDLE**, the game where you find the LSD member of the day!

## Overview

LSDLE is a fun and interactive game where you try to guess the correct member of the day. Each day, a new member of LSD will be selected, and you must use the clues provided to deduce the correct member. The faster you find the correct member, the more points you earn. Compete with friends and other players to see who can find the LSD member the fastest!

## How to Play

1. **Start the Game**: Try a name of member and see what you got right.
2. **Use Clues**: Use the clues to help you deduce the correct member.

# I'm a LSD Member, how can I add my information to the game?

To add your information to the game, you need to edit the `src/app/data/data.json` file. This file contains the information about all the LSD members, including their names, projects and graduation level. To add a new member, simply add a new object to the `members` array in the following format:

```json
{
    "name": "Member Name",
    "room": "The room where the member is",
    "project": "The projects where the member is as [project1, project]",
    "gender": "Your Gender",
    "graduation_level": "Your Graduation Level",
    "lsd_year": "The year you joined LSD, if has more than one year, put as [year1, year2]",
    "born_year": "The year you were born",
    "area": "The area you work",
    "ufcg_year": "The year you joined UFCG",
}
```

## Contributing

We welcome contributions to improve LSDLE! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

LSDLE is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or inquiries, please contact us at [mateus.ribeiro@lsd.ufcg.edu.br](mailto:mateus.ribeiro@lsd.ufcg.edu.br).

Enjoy the game and happy detective work!
