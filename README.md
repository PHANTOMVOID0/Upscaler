# Image Restoration & Upscale Tool

A clean, dark-themed UI for configuring and exporting AI image restoration prompts and parameters for Stable Diffusion.

## Files

```
image-restoration-tool/
├── index.html    ← main page
├── style.css     ← all styles
├── app.js        ← all logic
└── README.md     ← this file
```

---

## How to deploy (GitHub + Vercel — 100% free)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up if you don't have an account.

### Step 2 — Create a new repository
1. Click the **+** button (top right) → **New repository**
2. Name it: `image-restoration-tool`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload the files
1. On the repository page, click **Add file** → **Upload files**
2. Drag and drop all 4 files:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
3. Scroll down and click **Commit changes**

### Step 4 — Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account
2. Click **Add New Project**
3. Find your `image-restoration-tool` repository → click **Import**
4. Leave all settings as default — Vercel detects it automatically
5. Click **Deploy**

### Step 5 — Done!
In about 30 seconds you get a live URL like:
`https://image-restoration-tool.vercel.app`

That's your tool, live on the internet, for free.

---

## Features
- Upload any image (JPG, PNG, WEBP)
- Adjust Steps, CFG Scale, Denoising Strength via sliders
- Switch target resolution (4K / 2K / 1080p)
- Choose upscaler model
- Edit positive and negative prompts directly
- Export full config as `restoration_config.json`
- Copy config or individual prompts to clipboard

## How to use the exported config

### AUTOMATIC1111
- Open the **img2img** tab
- Paste the positive prompt in the prompt box
- Paste the negative prompt in the negative prompt box
- Set **Steps**, **CFG Scale**, **Denoising** to match
- Under **Hi-Res Fix**, select the upscaler from the dropdown
- Click Generate

### ComfyUI
- Use an img2img + Ultimate SD Upscale workflow
- Wire KSampler with cfg/steps/denoising values from the config
- Set upscaler node to the model specified in the config

### Replicate API
Use `nightmareai/real-esrgan` or similar model.
Map config fields:
```
parameters.steps          → num_inference_steps
parameters.cfg_scale      → guidance_scale
parameters.denoising_strength → prompt_strength
```

---

## Updating the tool
Any time you push changes to GitHub, Vercel automatically redeploys.
Just edit the files on GitHub or re-upload them.
