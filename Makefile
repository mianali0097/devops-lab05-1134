SRC_DIR := src
OUT_DIR := out
SOURCES := $(wildcard $(SRC_DIR)/*.md)
OUTPUTS := $(patsubst $(SRC_DIR)/%.md,$(OUT_DIR)/%.html,$(SOURCES))

.PHONY: all check build test clean ci deps

all: ci

check:
	@test -d "$(SRC_DIR)" || (echo "ERROR: source directory missing"; exit 1)
	@test -n "$(SOURCES)" || (echo "ERROR: no Markdown sources found"; exit 1)
	@echo "CHECK PASSED: $(words $(SOURCES)) source file(s) found"

deps:
	npm ci

$(OUT_DIR):
	mkdir -p $(OUT_DIR)

$(OUT_DIR)/%.html: $(SRC_DIR)/%.md | $(OUT_DIR)
	@echo "BUILD: $< -> $@"
	@npm run --silent build -- $< $@

build: $(OUTPUTS)

test: build
	@npm test --silent

clean:
	rm -rf $(OUT_DIR)

ci: clean deps check test
