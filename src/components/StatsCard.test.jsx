import { render, screen } from '@testing-library/react';
import StatsCard from './StatsCard';

describe('StatsCard', () => {
  it('renders the label', () => {
    render(<StatsCard label="Meetings Conducted" value={42} supplementary="+18 attendees" />);
    expect(screen.getByText('Meetings Conducted')).toBeInTheDocument();
  });

  it('renders a numeric value', () => {
    render(<StatsCard label="Meetings Conducted" value={42} supplementary="+18 attendees" />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders a string value', () => {
    render(<StatsCard label="Tasks" value="100%" supplementary="completed" />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('renders the supplementary text', () => {
    render(<StatsCard label="Meetings Conducted" value={42} supplementary="+18 attendees" />);
    expect(screen.getByText('+18 attendees')).toBeInTheDocument();
  });

  it('renders all three props together', () => {
    render(<StatsCard label="Meetings Conducted" value={42} supplementary="+18 attendees" />);
    expect(screen.getByText('Meetings Conducted')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('+18 attendees')).toBeInTheDocument();
  });
});
