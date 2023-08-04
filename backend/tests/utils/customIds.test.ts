import { generateCustomId } from "../../src/utils/customIds";

jest.mock('uuid', () => ({
  v4: () => 'mocked-uuid',
}));

describe('generateCustomId Function', () => {
  it('should generate a custom UUID string', () => {
    const customId = generateCustomId();
    expect(customId).toBe('mocked-uuid');
  });

});
