import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

interface cookbook {
  names: string[];
  recipes: recipe[];
  ingredients: ingredient[];
}

interface summary {
  name: string;
  cookTime: number;
  ingredients: { name: string; quantity: number }[];
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: cookbook = {
  names: [],
  recipes: [],
  ingredients: [],
};

// Task 1 helper (don't touch)
app.post("/parse", (req: Request, res: Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input);
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  }
  res.json({ msg: parsed_string });
  return;
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that
const parse_handwriting = (recipeName: string): string | null => {
  const re = /[^A-Za-z\s]/g;
  const reUnderscoreDash = /[-_\s]+/g;
  try {
    const res = recipeName
      .replace(reUnderscoreDash, " ")
      .replace(re, "")
      .trim()
      .split(" ")
      // sanitise words
      .map((letter) => {
        return letter[0].toUpperCase() + letter.slice(1).toLowerCase();
      })
      // add space between letters
      .reduce((accmu, word) => {
        return accmu + word + " ";
      }, "")
      .trimEnd();
    return res.length > 0 ? res : null;
  } catch (error) {
    return null;
  }
};

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req: Request, res: Response) => {
  const entry = req.body;

  try {
    addEntry(entry);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({});
});

//------------------------------------------------------------------------------
// Task 2 Helpers
//------------------------------------------------------------------------------

const addEntry = (entry: ingredient | recipe) => {
  entryBasicErrorChecks(entry);
  checkEntryUnique(entry.name);

  if (entry.type === "ingredient") {
    cookbook.ingredients.push(entry as ingredient);
  } else if (entry.type === "recipe") {
    requiredItemsValid(entry as recipe);
    cookbook.recipes.push(entry as recipe);
  }
  cookbook.names.push(entry.name);
};

const entryBasicErrorChecks = (entry: ingredient | recipe) => {
  if (entry.type !== "recipe" && entry.type !== "ingredient") {
    throw new Error("incorrect entry type");
  }

  if (entry.type === "ingredient" && (entry as ingredient).cookTime < 0) {
    throw new Error("cook time must be greater than or equal to 0");
  }
};

const requiredItemsValid = (recipe: recipe) => {
  const itemSet = new Set();

  recipe.requiredItems.forEach((item) => {
    if (itemSet.has(item.name)) {
      throw new Error("required items can only have one element per name");
    } else {
      itemSet.add(item.name);
    }
  });
};

const checkEntryUnique = (entryName: string) => {
  cookbook.names.forEach((name) => {
    if (name === entryName) {
      throw new Error("entry name not unique");
    }
  });
};

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req: Request, res: Request) => {
  const { name } = req.query;
  try {
    const summary = getSummary(name);
    return res.status(200).json(summary);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//------------------------------------------------------------------------------
// Task 3 Helpers
//------------------------------------------------------------------------------

const getSummary = (name: string) => {
  const summary = {
    name,
    cookTime: 0,
    ingredients: [],
  };

  const recipe = cookbook.recipes.find((recipe) => recipe.name === name);
  if (recipe === undefined) {
    throw new Error(`${name} is not a recipe name`);
  }

  recurseSummary(recipe, summary, 1);

  return summary;
};

// recursive subroutine
const recurseSummary = (
  entry: recipe | ingredient,
  summary: summary,
  quantity: number
) => {
  // base case
  if (entry.type === "ingredient") {
    const ingredientIndex = summary.ingredients.findIndex(
      (ingredient) => ingredient.name === entry.name
    );

    if (ingredientIndex === -1) {
      summary.ingredients.push({ name: entry.name, quantity });
    } else {
      summary.ingredients[ingredientIndex].quantity += quantity;
    }
    summary.cookTime += quantity * (entry as ingredient).cookTime;
    return;
  }

  // recursive case
  (entry as recipe).requiredItems.forEach((item) => {
    recurseSummary(findEntry(item.name), summary, quantity * item.quantity);
  });
};

const findEntry = (name: string) => {
  const ingredient = cookbook.ingredients.find(
    (ingredient) => ingredient.name === name
  );
  const recipe = cookbook.recipes.find((recipe) => recipe.name == name);

  if (ingredient === undefined && recipe === undefined) {
    throw new Error(`${name} not in cookbook`);
  }

  return ingredient || recipe;
};

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
