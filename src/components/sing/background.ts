import p5, { Color, Vector } from "p5";

export default (
	p: p5 & { myCustomRedrawAccordingToNewPropsHandler: (props: any) => void }
) => {
	let colors: Color[] = [p.color(255, 127)],
		move: Vector = p.createVector(0, 0),
		vel: Vector = p.createVector(0, 0),
		acc: Vector = p.createVector(0, 0);
	const spacing = 160,
		radius = 40;
	const w = 1920,
		h = 1080,
		wh = w / 2,
		hh = h / 2,
		wp = (4 * w) / spacing,
		hp = (4 * h) / spacing;
	const center = p.createVector(w / 2, h / 2);
	p.setup = () => {
		p.createCanvas(w, h);
	};
	p.draw = () => {
		p.noiseDetail(1, 0.5);
		p.background(5);
		p.rotate(-p.HALF_PI / 4, center);
		const frameModifier = p.frameCount * 1e-2;
		const fastModifier = p.frameCount * 1e-1;
		acc = acc
			.add(Vector.fromAngle(p.noise(frameModifier) * 2 * p.TWO_PI))
			.limit(0.5);
		vel = vel.add(acc).limit(0.5);
		move = move.add(vel);
		p.translate(move);
		for (let x = 0; x < wp; x++) {
			for (let y = 0; y < hp; y++) {
				const color = colors[(y * wp + x + (y % 2)) % colors.length];
				color.setAlpha(64);
				p.fill(color);
				p.circle(x * spacing - wh, y * spacing - hh, radius);
				const fdeg = p.noise(fastModifier, x);
				color.setAlpha(32);
				p.fill(color);
				p.circle(x * spacing - wh, y * spacing - hh, radius + 16 * fdeg);
				const sdeg = p.noise(fastModifier, y);
				color.setAlpha(16);
				p.fill(color);
				p.circle(x * spacing - wh, y * spacing - hh, radius + 8 + 32 * sdeg);
			}
		}
	};
	p.myCustomRedrawAccordingToNewPropsHandler = ({ colors: c }) => {
		c && c.length && (colors = c.map(n => p.color(n)));
	};
};
