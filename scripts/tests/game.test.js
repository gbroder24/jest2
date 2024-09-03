/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn } = require("../game");

beforeAll(() => {

    let fs = require("fs");

    let fileContents = fs.readFileSync("index.html", "utf-8");

    document.open();
    document.write(fileContents);
    document.close();

});

describe("game object contains correct keys", () => {

    test("score key exists", () => {

        expect("score" in game).toBe(true);

    });

    test("currentGame key exists", () => {

        expect("currentGame" in game).toBe(true);

    });

    test("playerMoves key exists", () => {

        expect("playerMoves" in game).toBe(true);

    });

    test("choices key exists", () => {

        expect("choices" in game).toBe(true);

    });

    test("choices contain correct ids", () => {

        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);

    });

} );

describe("newGame works correctly", () => {

    beforeAll(() => {

        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerHTML = "42";
        newGame();

    });

    test("should set game score to zero", () => {

        expect(game.score).toEqual(0);

    });

    test("should add one move in the computers game array", () => {

        expect(game.currentGame.length).toBe(1);

    });

    
    test("should empty playersMove array", () => {

        expect(game.playerMoves.length).toBe(0);

    });

    // Test removed. No longer needed as we need to test for an element in the computers array. 
    // test("should empty currentGame array", () => {

    //     expect(game.currentGame.length).toEqual(0);

    // });

    test("should display 0 for the element with id of score", () => {

        expect(document.getElementById("score").innerText).toEqual(0);

    });

});

describe("gameplay works correctly", () => {

    beforeEach( () => {

        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
        addTurn();

    });

    afterEach( () => {

        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];

    } );

    test("addTurn adds a new turn to the game", () => {

        addTurn();
        expect(game.currentGame.length).toBe(2);

    });

    test("should add correct class to light up the buttons", () => {

        let button = document.getElementById(game.currentGame[0]);

        lightsOn(game.currentGame[0]);

        expect(button.classList).toContain("light");

    });

});