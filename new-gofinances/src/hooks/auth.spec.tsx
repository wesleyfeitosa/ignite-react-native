import { renderHook, act } from '@testing-library/react-hooks';

import { AuthProvider, useAuth } from './auth';

describe('Auth Hook', () => {
  it('should be able to sign in with Google Account existing', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toHaveProperty('id');
  });
});
