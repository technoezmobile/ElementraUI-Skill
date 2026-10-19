# Resource Classification Guide

Quick reference for coding agents to classify any ElementraUI resource:

```
                                  Does item have
                             non-empty componentCode?
                                   /        \
                                 YES         NO
                                 /            \
                        EXECUTABLE-REACT     Does item have
                                             rendered.html?
                                             /          \
                                           YES           NO
                                           /              \
                                     HTML-SNAPSHOT   Does item have
                                                     screenshotUrl only?
                                                     /            \
                                                   YES             NO
                                                   /                \
                                           SCREENSHOT-REF       Check itemType:
                                                                • prompt -> PROMPT-BLUEPRINT
                                                                • theme  -> THEME-TOKENS
                                                                • template -> TEMPLATE-STARTER
                                                                • other  -> REGISTRY-SPEC
```

### Classification Flags:
- `hasCode: true` $\to$ Runnable TSX/React.
- `hasCode: false` $\to$ Static snapshot, prompt, or reference.
