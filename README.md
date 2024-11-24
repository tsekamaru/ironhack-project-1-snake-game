# ironhack-project-1-snake-game
The first student project of Ironhack part-time october 2024 class. 

1. Defining the feature of the minimal viable game
    1. Winning criteria
        - There is no conclusive winning point. However, the game is designed for players to score as high as possible by eating as many food.
    2. Losing criteria
        - The player can lose if one of the following things happen:
            - If the snake collide into walls
            - If the snake collide into obstacles
    3. Food
        - Food will be generated randomly in the playable area as soon as previous food is picked
        - There will be only one food on screen at any given moment
        - Food will have an area of 1 game square (1x1)
    4. Obstacle
        - Obstacle will be generated at every time the food is picked.
        - There will be increasingly more obstacles as the game progresses
        - Obstacle will have an area of 1 game square (1x1)
    5. Snake
        - Snake will have size of 2 game square (2x1) - One square head and one square tail
        - Snake cannot collide into itself
        - Snake can move only forward and turn its head to the right or left
        - Snake has a movement speed of 2 game square per second
    6. Score
        - Each picked-food can add 1 point to the score
    
